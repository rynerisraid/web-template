import uuid
import datetime
from pydantic import BaseModel
from app.config.db import Base
from sqlalchemy import Column, String, DateTime, Boolean, Text, ForeignKey, Integer
from sqlalchemy.dialects.postgresql import UUID
from typing import Optional, List, Dict, Any
from sqlalchemy.orm import relationship

# DataPipeline model: data ingestion / cleaning / transform tasks
class DataPipeline(Base):
    __tablename__ = "data_pipelines"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, unique=True, index=True, nullable=False)
    description = Column(Text, nullable=True)
    source_id = Column(UUID(as_uuid=True), ForeignKey('data_sources.id'), nullable=False)
    destination_table = Column(String, nullable=False)
    schedule = Column(String, nullable=True)  # e.g., 'daily', 'hourly', 'weekly'
    created_by = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.now)
    updated_at = Column(DateTime, default=datetime.datetime.now, onupdate=datetime.datetime.now)

    def __repr__(self):
        return f'<DataPipeline {self.name}>'

# Pydantic schemas for DataPipeline
class DataPipelineBase(BaseModel):
    name: str
    description: Optional[str] = None
    source_id: uuid.UUID
    destination_table: str
    schedule: Optional[str] = None
    created_by: uuid.UUID
    is_active: bool = True

    class Config:
        from_attributes = True

class DataPipelineCreate(DataPipelineBase):
    pass

class DataPipelineRead(DataPipelineBase):
    id: uuid.UUID
    created_at: datetime.datetime
    updated_at: datetime.datetime


# -------------------- Transform task and DAG models --------------------
class TransformTask(Base):
    __tablename__ = "transform_tasks"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, unique=True, index=True, nullable=False)
    description = Column(Text, nullable=True)
    pipeline_id = Column(UUID(as_uuid=True), ForeignKey('data_pipelines.id'), nullable=True)
    config = Column(Text, nullable=True)  # JSON/textual transform configuration
    position = Column(Integer, nullable=True)
    created_by = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.now)
    updated_at = Column(DateTime, default=datetime.datetime.now, onupdate=datetime.datetime.now)

    pipeline = relationship('DataPipeline', backref='transform_tasks')

    def __repr__(self):
        return f'<TransformTask {self.name}>'


class DirectedAcyclicGraph(Base):
    __tablename__ = "dags"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, unique=True, index=True, nullable=False)
    description = Column(Text, nullable=True)
    pipeline_id = Column(UUID(as_uuid=True), ForeignKey('data_pipelines.id'), nullable=True)
    created_by = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.now)
    updated_at = Column(DateTime, default=datetime.datetime.now, onupdate=datetime.datetime.now)

    pipeline = relationship('DataPipeline', backref='dags')

    def __repr__(self):
        return f'<DAG {self.name}>'


class DAGNode(Base):
    __tablename__ = "dag_nodes"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    dag_id = Column(UUID(as_uuid=True), ForeignKey('dags.id'), nullable=False)
    task_id = Column(UUID(as_uuid=True), ForeignKey('transform_tasks.id'), nullable=False)
    name = Column(String, nullable=True)
    metadata = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.now)

    dag = relationship('DirectedAcyclicGraph', backref='nodes')
    task = relationship('TransformTask')

    def __repr__(self):
        return f'<DAGNode {self.id} - task {self.task_id}>'


class DAGEdge(Base):
    __tablename__ = "dag_edges"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    dag_id = Column(UUID(as_uuid=True), ForeignKey('dags.id'), nullable=False)
    from_node_id = Column(UUID(as_uuid=True), ForeignKey('dag_nodes.id'), nullable=False)
    to_node_id = Column(UUID(as_uuid=True), ForeignKey('dag_nodes.id'), nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.now)

    dag = relationship('DirectedAcyclicGraph', backref='edges')
    from_node = relationship('DAGNode', foreign_keys=[from_node_id])
    to_node = relationship('DAGNode', foreign_keys=[to_node_id])

    def __repr__(self):
        return f'<DAGEdge {self.from_node_id} -> {self.to_node_id}>'


# -------------------- Pydantic schemas for transform tasks & DAG --------------------
class TransformTaskBase(BaseModel):
    name: str
    description: Optional[str] = None
    pipeline_id: Optional[uuid.UUID] = None
    config: Optional[str] = None
    position: Optional[int] = None
    created_by: Optional[uuid.UUID] = None
    is_active: bool = True

    class Config:
        from_attributes = True


class TransformTaskCreate(TransformTaskBase):
    pass


class TransformTaskRead(TransformTaskBase):
    id: uuid.UUID
    created_at: datetime.datetime


class DAGBase(BaseModel):
    name: str
    description: Optional[str] = None
    pipeline_id: Optional[uuid.UUID] = None
    created_by: Optional[uuid.UUID] = None
    is_active: bool = True

    class Config:
        from_attributes = True


class DAGCreate(DAGBase):
    pass


class DAGRead(DAGBase):
    id: uuid.UUID
    created_at: datetime.datetime


class DAGNodeBase(BaseModel):
    dag_id: uuid.UUID
    task_id: uuid.UUID
    name: Optional[str] = None
    metadata: Optional[str] = None

    class Config:
        from_attributes = True


class DAGNodeCreate(DAGNodeBase):
    pass


class DAGNodeRead(DAGNodeBase):
    id: uuid.UUID
    created_at: datetime.datetime


class DAGEdgeBase(BaseModel):
    dag_id: uuid.UUID
    from_node_id: uuid.UUID
    to_node_id: uuid.UUID

    class Config:
        from_attributes = True


class DAGEdgeCreate(DAGEdgeBase):
    pass


class DAGEdgeRead(DAGEdgeBase):
    id: uuid.UUID
    created_at: datetime.datetime


# -------------------- DAG utility: cycle detection (pure-Python) --------------------
def dag_has_cycle(nodes: List[Optional[uuid.UUID]], edges: List[Dict[str, Optional[uuid.UUID]]]) -> bool:
    """
    Simple cycle detection for a DAG described by nodes and edges.

    nodes: list of node ids
    edges: list of dicts with keys 'from' and 'to' (UUIDs)

    Returns True if a cycle exists.
    """
    # filter out None nodes
    adj: Dict[uuid.UUID, List[uuid.UUID]] = {n: [] for n in nodes if n is not None}
    for e in edges:
        f = e.get('from')
        t = e.get('to')
        # skip incomplete edges
        if f is None or t is None:
            continue
        if f not in adj:
            adj[f] = []
        adj[f].append(t)

    visited: Dict[uuid.UUID, int] = {}  # 0=unvisited,1=visiting,2=visited

    def dfs(u: uuid.UUID) -> bool:
        state = visited.get(u, 0)
        if state == 1:
            return True
        if state == 2:
            return False
        visited[u] = 1
        for v in adj.get(u, []):
            if dfs(v):
                return True
        visited[u] = 2
        return False

    for node in list(adj.keys()):
        if visited.get(node, 0) == 0:
            if dfs(node):
                return True
    return False

