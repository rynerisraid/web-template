import uuid
from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import delete, update
from app.models.data import DataSource, DataPipeline, DataTable, DataSourceCreate, DataSourceRead, DataPipelineCreate, DataPipelineRead, DataTableCreate, DataTableRead, DataSourceType

class DataService:
    """
    数据服务类，提供对数据源、数据管道和数据表的完整CRUD操作
    """
    def __init__(self, db: AsyncSession):
        """
        初始化数据服务
        
        Args:
            db: 异步数据库会话实例
        """
        self.db = db

    # DataSource CRUD operations
    async def create_data_source(self, data_source: DataSourceCreate) -> DataSourceRead:
        """
        创建新的数据源记录
        
        Args:
            data_source: 数据源创建模型，包含要创建的数据源信息
            
        Returns:
            DataSourceRead: 创建后的数据源读取模型
        """
        db_data_source = DataSource(**data_source.model_dump(exclude_unset=True))
        self.db.add(db_data_source)
        await self.db.commit()
        await self.db.refresh(db_data_source)
        return DataSourceRead.model_validate(db_data_source)

    async def get_data_source(self, data_source_id: uuid.UUID) -> Optional[DataSourceRead]:
        """
        根据ID获取单个数据源记录
        
        Args:
            data_source_id: 数据源的UUID
            
        Returns:
            DataSourceRead: 数据源读取模型，如果未找到则返回None
        """
        result = await self.db.execute(select(DataSource).where(DataSource.id == data_source_id))
        data_source = result.scalar_one_or_none()
        if data_source:
            return DataSourceRead.model_validate(data_source)
        return None

    async def get_data_sources(self, skip: int = 0, limit: int = 100) -> List[DataSourceRead]:
        """
        获取数据源列表，支持分页
        
        Args:
            skip: 跳过的记录数，默认为0
            limit: 返回的记录数限制，默认为100
            
        Returns:
            List[DataSourceRead]: 数据源读取模型列表
        """
        result = await self.db.execute(select(DataSource).offset(skip).limit(limit))
        data_sources = result.scalars().all()
        return [DataSourceRead.model_validate(ds) for ds in data_sources]

    async def update_data_source(self, data_source_id: uuid.UUID, data_source_update: dict) -> Optional[DataSourceRead]:
        """
        更新数据源记录
        
        Args:
            data_source_id: 要更新的数据源UUID
            data_source_update: 包含更新字段的字典
            
        Returns:
            DataSourceRead: 更新后的数据源读取模型，如果未找到则返回None
        """
        stmt = (
            update(DataSource)
            .where(DataSource.id == data_source_id)
            .values(**data_source_update)
        )
        await self.db.execute(stmt)
        await self.db.commit()
        
        # 获取更新后的记录
        result = await self.db.execute(select(DataSource).where(DataSource.id == data_source_id))
        updated_data_source = result.scalar_one_or_none()
        if updated_data_source:
            return DataSourceRead.model_validate(updated_data_source)
        return None

    async def delete_data_source(self, data_source_id: uuid.UUID) -> bool:
        """
        删除数据源记录
        
        Args:
            data_source_id: 要删除的数据源UUID
            
        Returns:
            bool: 删除成功返回True，否则返回False
        """
        stmt = delete(DataSource).where(DataSource.id == data_source_id)
        result = await self.db.execute(stmt)
        await self.db.commit()
        return result.rowcount > 0

    # DataPipeline CRUD operations
    async def create_data_pipeline(self, data_pipeline: DataPipelineCreate) -> DataPipelineRead:
        """
        创建新的数据管道记录
        
        Args:
            data_pipeline: 数据管道创建模型，包含要创建的数据管道信息
            
        Returns:
            DataPipelineRead: 创建后的数据管道读取模型
        """
        db_data_pipeline = DataPipeline(**data_pipeline.model_dump(exclude_unset=True))
        self.db.add(db_data_pipeline)
        await self.db.commit()
        await self.db.refresh(db_data_pipeline)
        return DataPipelineRead.model_validate(db_data_pipeline)

    async def get_data_pipeline(self, data_pipeline_id: uuid.UUID) -> Optional[DataPipelineRead]:
        """
        根据ID获取单个数据管道记录
        
        Args:
            data_pipeline_id: 数据管道的UUID
            
        Returns:
            DataPipelineRead: 数据管道读取模型，如果未找到则返回None
        """
        result = await self.db.execute(select(DataPipeline).where(DataPipeline.id == data_pipeline_id))
        data_pipeline = result.scalar_one_or_none()
        if data_pipeline:
            return DataPipelineRead.model_validate(data_pipeline)
        return None

    async def get_data_pipelines(self, skip: int = 0, limit: int = 100) -> List[DataPipelineRead]:
        """
        获取数据管道列表，支持分页
        
        Args:
            skip: 跳过的记录数，默认为0
            limit: 返回的记录数限制，默认为100
            
        Returns:
            List[DataPipelineRead]: 数据管道读取模型列表
        """
        result = await self.db.execute(select(DataPipeline).offset(skip).limit(limit))
        data_pipelines = result.scalars().all()
        return [DataPipelineRead.model_validate(dp) for dp in data_pipelines]

    async def update_data_pipeline(self, data_pipeline_id: uuid.UUID, data_pipeline_update: dict) -> Optional[DataPipelineRead]:
        """
        更新数据管道记录
        
        Args:
            data_pipeline_id: 要更新的数据管道UUID
            data_pipeline_update: 包含更新字段的字典
            
        Returns:
            DataPipelineRead: 更新后的数据管道读取模型，如果未找到则返回None
        """
        stmt = (
            update(DataPipeline)
            .where(DataPipeline.id == data_pipeline_id)
            .values(**data_pipeline_update)
        )
        await self.db.execute(stmt)
        await self.db.commit()
        
        # 获取更新后的记录
        result = await self.db.execute(select(DataPipeline).where(DataPipeline.id == data_pipeline_id))
        updated_data_pipeline = result.scalar_one_or_none()
        if updated_data_pipeline:
            return DataPipelineRead.model_validate(updated_data_pipeline)
        return None

    async def delete_data_pipeline(self, data_pipeline_id: uuid.UUID) -> bool:
        """
        删除数据管道记录
        
        Args:
            data_pipeline_id: 要删除的数据管道UUID
            
        Returns:
            bool: 删除成功返回True，否则返回False
        """
        stmt = delete(DataPipeline).where(DataPipeline.id == data_pipeline_id)
        result = await self.db.execute(stmt)
        await self.db.commit()
        return result.rowcount > 0

    # DataTable CRUD operations
    async def create_data_table(self, data_table: DataTableCreate) -> DataTableRead:
        """
        创建新的数据表记录
        
        Args:
            data_table: 数据表创建模型，包含要创建的数据表信息
            
        Returns:
            DataTableRead: 创建后的数据表读取模型
        """
        db_data_table = DataTable(**data_table.model_dump(exclude_unset=True))
        self.db.add(db_data_table)
        await self.db.commit()
        await self.db.refresh(db_data_table)
        return DataTableRead.model_validate(db_data_table)

    async def get_data_table(self, data_table_id: uuid.UUID) -> Optional[DataTableRead]:
        """
        根据ID获取单个数据表记录
        
        Args:
            data_table_id: 数据表的UUID
            
        Returns:
            DataTableRead: 数据表读取模型，如果未找到则返回None
        """
        result = await self.db.execute(select(DataTable).where(DataTable.id == data_table_id))
        data_table = result.scalar_one_or_none()
        if data_table:
            return DataTableRead.model_validate(data_table)
        return None

    async def get_data_tables(self, skip: int = 0, limit: int = 100) -> List[DataTableRead]:
        """
        获取数据表列表，支持分页
        
        Args:
            skip: 跳过的记录数，默认为0
            limit: 返回的记录数限制，默认为100
            
        Returns:
            List[DataTableRead]: 数据表读取模型列表
        """
        result = await self.db.execute(select(DataTable).offset(skip).limit(limit))
        data_tables = result.scalars().all()
        return [DataTableRead.model_validate(dt) for dt in data_tables]

    async def update_data_table(self, data_table_id: uuid.UUID, data_table_update: dict) -> Optional[DataTableRead]:
        """
        更新数据表记录
        
        Args:
            data_table_id: 要更新的数据表UUID
            data_table_update: 包含更新字段的字典
            
        Returns:
            DataTableRead: 更新后的数据表读取模型，如果未找到则返回None
        """
        stmt = (
            update(DataTable)
            .where(DataTable.id == data_table_id)
            .values(**data_table_update)
        )
        await self.db.execute(stmt)
        await self.db.commit()
        
        # 获取更新后的记录
        result = await self.db.execute(select(DataTable).where(DataTable.id == data_table_id))
        updated_data_table = result.scalar_one_or_none()
        if updated_data_table:
            return DataTableRead.model_validate(updated_data_table)
        return None

    async def delete_data_table(self, data_table_id: uuid.UUID) -> bool:
        """
        删除数据表记录
        
        Args:
            data_table_id: 要删除的数据表UUID
            
        Returns:
            bool: 删除成功返回True，否则返回False
        """
        stmt = delete(DataTable).where(DataTable.id == data_table_id)
        result = await self.db.execute(stmt)
        await self.db.commit()
        return result.rowcount > 0

    # Additional utility methods
    async def get_data_sources_by_type(self, source_type: DataSourceType) -> List[DataSourceRead]:
        """
        根据数据源类型获取数据源列表
        
        Args:
            source_type: 数据源类型枚举值
            
        Returns:
            List[DataSourceRead]: 指定类型的数据源读取模型列表
        """
        result = await self.db.execute(select(DataSource).where(DataSource.type == source_type))
        data_sources = result.scalars().all()
        return [DataSourceRead.model_validate(ds) for ds in data_sources]

    async def get_active_data_sources(self) -> List[DataSourceRead]:
        """
        获取所有激活状态的数据源
        
        Returns:
            List[DataSourceRead]: 激活状态的数据源读取模型列表
        """
        result = await self.db.execute(select(DataSource).where(DataSource.is_active == True))
        data_sources = result.scalars().all()
        return [DataSourceRead.model_validate(ds) for ds in data_sources]

    async def get_data_pipelines_by_source(self, source_id: uuid.UUID) -> List[DataPipelineRead]:
        """
        根据数据源ID获取关联的数据管道列表
        
        Args:
            source_id: 数据源UUID
            
        Returns:
            List[DataPipelineRead]: 关联的数据管道读取模型列表
        """
        result = await self.db.execute(select(DataPipeline).where(DataPipeline.source_id == source_id))
        data_pipelines = result.scalars().all()
        return [DataPipelineRead.model_validate(dp) for dp in data_pipelines]