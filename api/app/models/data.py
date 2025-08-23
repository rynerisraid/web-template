import uuid
from sqlalchemy import Column, String, DateTime, Integer, Boolean, Text, ForeignKey, Enum
import enum
from sqlalchemy.dialects.postgresql import UUID
import datetime
from pydantic import BaseModel
from app.config.db import Base
import base64
from typing import Optional

# DataSource type enum
class DataSourceType(str, enum.Enum):
    POSTGRESQL = "postgresql"
    MYSQL = "mysql"
    MONGODB = "mongodb"
    API = "api"
    CSV = "csv"
    JSON = "json"

# 数据源模型: 数据库连接
class DataSource(Base):
    __tablename__ = "data_sources"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, unique=True, index=True, nullable=False)
    type = Column(Enum(DataSourceType), nullable=False)
    host = Column(String, nullable=False)
    port = Column(Integer, nullable=True)
    database = Column(String, nullable=True)
    username = Column(String, nullable=True)
    # Store encrypted password for database connections
    password = Column("password", String, nullable=True)  # For database connections
    created_by = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False)
    connection_string = Column(String, nullable=True)  # For other types of connections
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.now)
    updated_at = Column(DateTime, default=datetime.datetime.now, onupdate=datetime.datetime.now)

    def set_encrypted_password(self, password: str, encryption_key: Optional[str] = None):
        """
        Encrypt and store the password for database connections.
        If encryption_key is provided, store an encrypted version for database connections.
        """
        if password and encryption_key:
            try:
                # Simple XOR encryption with key - for demonstration purposes
                # In production, you should use a proper encryption library
                key_bytes = encryption_key.encode('utf-8')
                password_bytes = password.encode('utf-8')
                encrypted_bytes = bytearray()
                
                for i in range(len(password_bytes)):
                    encrypted_bytes.append(password_bytes[i] ^ key_bytes[i % len(key_bytes)])
                
                self._password = base64.b64encode(encrypted_bytes).decode('utf-8')
            except Exception:
                # If encryption fails, store as None
                self._password = None
        else:
            self._password = None

    def get_decrypted_password(self, encryption_key: str) -> str | None:
        """
        Decrypt and return the original password for connecting to other databases.
        This requires an encryption key to decrypt the stored password.
        """
        if self._password is None or encryption_key is None:
            return None
        
        try:
            # Simple XOR decryption with key
            key_bytes = encryption_key.encode('utf-8')
            encrypted_bytes = base64.b64decode(self._password.encode('utf-8'))
            decrypted_bytes = bytearray()
            
            for i in range(len(encrypted_bytes)):
                decrypted_bytes.append(encrypted_bytes[i] ^ key_bytes[i % len(key_bytes)])
            
            return decrypted_bytes.decode('utf-8')
        except Exception:
            # If decryption fails, return None
            return None

    def get_id(self):
        return str(self.id)

    def __repr__(self):
        return f'<DataSource {self.name}>'

# DataPipeline model has been moved to `app/models/tasks.py` to keep task-related
# models grouped under the tasks module. See `app/models/tasks.py` for the
# ORM model and related Pydantic schemas.


# 数据表格：维度表、事实表管理
class DataTable(Base):
    __tablename__ = "data_tables"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, unique=True, index=True, nullable=False)
    description = Column(Text, nullable=True)
    table_type = Column(String, nullable=False)  # e.g., 'dimension', 'fact', 'staging'
    schema_name = Column(String, nullable=True)
    database_name = Column(String, nullable=True)
    source_id = Column(UUID(as_uuid=True), ForeignKey('data_sources.id'), nullable=True)
    created_by = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.now)
    updated_at = Column(DateTime, default=datetime.datetime.now, onupdate=datetime.datetime.now)

    def __repr__(self):
        return f'<DataTable {self.name}>'

# DataSource schemas
class DataSourceBase(BaseModel):
    name: str
    type: DataSourceType
    host: str
    port: int | None = None
    database: str | None = None
    username: str | None = None
    created_by: uuid.UUID
    connection_string: str | None = None
    is_active: bool = True

    class Config:
        from_attributes = True

class DataSourceCreate(DataSourceBase):
    password: str | None = None

class DataSourceRead(DataSourceBase):
    id: uuid.UUID
    created_at: datetime.datetime
    updated_at: datetime.datetime

# DataPipeline Pydantic schemas have been moved to `app/models/tasks.py`.

# DataTable schemas
class DataTableBase(BaseModel):
    name: str
    description: str | None = None
    table_type: str  # e.g., 'dimension', 'fact', 'staging'
    schema_name: str | None = None
    database_name: str | None = None
    source_id: uuid.UUID | None = None
    created_by: uuid.UUID
    is_active: bool = True

    class Config:
        from_attributes = True

class DataTableCreate(DataTableBase):
    pass

class DataTableRead(DataTableBase):
    id: uuid.UUID
    created_at: datetime.datetime
    updated_at: datetime.datetime
