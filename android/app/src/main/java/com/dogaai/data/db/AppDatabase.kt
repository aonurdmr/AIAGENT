package com.dogaai.data.db

import androidx.room.Database
import androidx.room.RoomDatabase
import androidx.room.TypeConverters
import com.dogaai.data.db.entity.ActivityEntity
import com.dogaai.data.db.entity.SpotEntity

@Database(
    entities = [ActivityEntity::class, SpotEntity::class],
    version = 1,
    exportSchema = false
)
@TypeConverters(Converters::class)
abstract class AppDatabase : RoomDatabase() {
    abstract fun activityDao(): ActivityDao
    abstract fun spotDao(): SpotDao
}
