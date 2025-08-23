from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.config.db import get_async_db
from app.services.data import DataService
from app.models.data import (
    DataSourceCreate, 
    DataSourceRead, 
    DataTableCreate, 
    DataTableRead,
    DataSourceType,
)

import uuid
from app.models.auth import User
from app.services.auth import get_current_user

router = APIRouter(dependencies=[Depends(get_current_user)])

# DataSource endpoints
@router.post("/sources/", response_model=DataSourceRead, status_code=status.HTTP_201_CREATED)
async def create_data_source(
    data_source: DataSourceCreate,
    db: AsyncSession = Depends(get_async_db),
    current_user: User = Depends(get_current_user)
):
    """
    Create a new data source
    """
    # 用当前登录用户id覆盖 created_by 字段
    data_source_dict = data_source.model_dump(exclude_unset=True)
    data_source_dict["created_by"] = current_user.id
    service = DataService(db)
    # 重新用 dict 构造 DataSourceCreate
    new_data_source = type(data_source)(**data_source_dict)
    return await service.create_data_source(new_data_source)

@router.get("/sources/", response_model=List[DataSourceRead])
async def read_data_sources(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_async_db)):
    """
    Get list of data sources with pagination
    """
    service = DataService(db)
    return await service.get_data_sources(skip, limit)

@router.get("/sources/{source_id}", response_model=DataSourceRead)
async def read_data_source(source_id: uuid.UUID, db: AsyncSession = Depends(get_async_db)):
    """
    Get a specific data source by ID
    """
    service = DataService(db)
    db_data_source = await service.get_data_source(source_id)
    if db_data_source is None:
        raise HTTPException(status_code=404, detail="Data source not found")
    return db_data_source

@router.put("/sources/{source_id}", response_model=DataSourceRead)
async def update_data_source(source_id: uuid.UUID, data_source_update: dict, db: AsyncSession = Depends(get_async_db)):
    """
    Update a data source
    """
    service = DataService(db)
    db_data_source = await service.update_data_source(source_id, data_source_update)
    if db_data_source is None:
        raise HTTPException(status_code=404, detail="Data source not found")
    return db_data_source

@router.delete("/sources/{source_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_data_source(source_id: uuid.UUID, db: AsyncSession = Depends(get_async_db)):
    """
    Delete a data source
    """
    service = DataService(db)
    success = await service.delete_data_source(source_id)
    if not success:
        raise HTTPException(status_code=404, detail="Data source not found")
    return


# DataTable endpoints
@router.post("/tables/", response_model=DataTableRead, status_code=status.HTTP_201_CREATED)
async def create_data_table(data_table: DataTableCreate, db: AsyncSession = Depends(get_async_db)):
    """
    Create a new data table
    """
    service = DataService(db)
    return await service.create_data_table(data_table)

@router.get("/tables/", response_model=List[DataTableRead])
async def read_data_tables(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_async_db)):
    """
    Get list of data tables with pagination
    """
    service = DataService(db)
    return await service.get_data_tables(skip, limit)

@router.get("/tables/{table_id}", response_model=DataTableRead)
async def read_data_table(table_id: uuid.UUID, db: AsyncSession = Depends(get_async_db)):
    """
    Get a specific data table by ID
    """
    service = DataService(db)
    db_data_table = await service.get_data_table(table_id)
    if db_data_table is None:
        raise HTTPException(status_code=404, detail="Data table not found")
    return db_data_table

@router.put("/tables/{table_id}", response_model=DataTableRead)
async def update_data_table(table_id: uuid.UUID, data_table_update: dict, db: AsyncSession = Depends(get_async_db)):
    """
    Update a data table
    """
    service = DataService(db)
    db_data_table = await service.update_data_table(table_id, data_table_update)
    if db_data_table is None:
        raise HTTPException(status_code=404, detail="Data table not found")
    return db_data_table

@router.delete("/tables/{table_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_data_table(table_id: uuid.UUID, db: AsyncSession = Depends(get_async_db)):
    """
    Delete a data table
    """
    service = DataService(db)
    success = await service.delete_data_table(table_id)
    if not success:
        raise HTTPException(status_code=404, detail="Data table not found")
    return

# Additional utility endpoints
@router.get("/sources/type/{source_type}", response_model=List[DataSourceRead])
async def read_data_sources_by_type(source_type: DataSourceType, db: AsyncSession = Depends(get_async_db)):
    """
    Get data sources by type
    """
    service = DataService(db)
    return await service.get_data_sources_by_type(source_type)

@router.get("/sources/active/", response_model=List[DataSourceRead])
async def read_active_data_sources(db: AsyncSession = Depends(get_async_db)):
    """
    Get all active data sources
    """
    service = DataService(db)
    return await service.get_active_data_sources()

