import uuid
from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import delete, update
from app.models.tasks import DataPipeline, DataPipelineCreate, DataPipelineRead


class PipelineService:
    """
    Data pipeline (task) related service. 提供 DataPipeline 的 CRUD 操作。
    """
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create_data_pipeline(self, data_pipeline: DataPipelineCreate) -> DataPipelineRead:
        db_data_pipeline = DataPipeline(**data_pipeline.model_dump(exclude_unset=True))
        self.db.add(db_data_pipeline)
        await self.db.commit()
        await self.db.refresh(db_data_pipeline)
        return DataPipelineRead.model_validate(db_data_pipeline)

    async def get_data_pipeline(self, data_pipeline_id: uuid.UUID) -> Optional[DataPipelineRead]:
        result = await self.db.execute(select(DataPipeline).where(DataPipeline.id == data_pipeline_id))
        data_pipeline = result.scalar_one_or_none()
        if data_pipeline:
            return DataPipelineRead.model_validate(data_pipeline)
        return None

    async def get_data_pipelines(self, skip: int = 0, limit: int = 100) -> List[DataPipelineRead]:
        result = await self.db.execute(select(DataPipeline).offset(skip).limit(limit))
        data_pipelines = result.scalars().all()
        return [DataPipelineRead.model_validate(dp) for dp in data_pipelines]

    async def update_data_pipeline(self, data_pipeline_id: uuid.UUID, data_pipeline_update: dict) -> Optional[DataPipelineRead]:
        stmt = (
            update(DataPipeline)
            .where(DataPipeline.id == data_pipeline_id)
            .values(**data_pipeline_update)
        )
        await self.db.execute(stmt)
        await self.db.commit()

        result = await self.db.execute(select(DataPipeline).where(DataPipeline.id == data_pipeline_id))
        updated_data_pipeline = result.scalar_one_or_none()
        if updated_data_pipeline:
            return DataPipelineRead.model_validate(updated_data_pipeline)
        return None

    async def delete_data_pipeline(self, data_pipeline_id: uuid.UUID) -> bool:
        stmt = delete(DataPipeline).where(DataPipeline.id == data_pipeline_id)
        result = await self.db.execute(stmt)
        await self.db.commit()
        return result.rowcount > 0

    async def get_data_pipelines_by_source(self, source_id: uuid.UUID) -> List[DataPipelineRead]:
        result = await self.db.execute(select(DataPipeline).where(DataPipeline.source_id == source_id))
        data_pipelines = result.scalars().all()
        return [DataPipelineRead.model_validate(dp) for dp in data_pipelines]
