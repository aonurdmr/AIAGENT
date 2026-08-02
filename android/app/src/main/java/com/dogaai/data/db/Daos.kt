package com.dogaai.data.db

import androidx.room.*
import com.dogaai.data.db.entity.ActivityEntity
import com.dogaai.data.db.entity.SpotEntity
import kotlinx.coroutines.flow.Flow

@Dao
interface ActivityDao {
    @Query("SELECT * FROM activities ORDER BY createdAt DESC")
    fun observeAll(): Flow<List<ActivityEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertAll(items: List<ActivityEntity>)

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insert(item: ActivityEntity)

    @Query("DELETE FROM activities")
    suspend fun deleteAll()
}

@Dao
interface SpotDao {
    @Query("SELECT * FROM spots ORDER BY rating DESC")
    fun observeAll(): Flow<List<SpotEntity>>

    @Query("SELECT * FROM spots WHERE type = :type ORDER BY rating DESC")
    fun observeByType(type: String): Flow<List<SpotEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertAll(items: List<SpotEntity>)

    @Query("DELETE FROM spots")
    suspend fun deleteAll()
}
