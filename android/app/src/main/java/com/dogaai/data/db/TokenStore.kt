package com.dogaai.data.db

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.coroutines.flow.map
import javax.inject.Inject
import javax.inject.Singleton

private val Context.dataStore: DataStore<Preferences> by preferencesDataStore(name = "dogaai_prefs")

@Singleton
class TokenStore @Inject constructor(
    @ApplicationContext private val context: Context
) {
    private val TOKEN_KEY = stringPreferencesKey("token")
    private val USER_JSON_KEY = stringPreferencesKey("user_json")

    suspend fun saveToken(token: String) {
        context.dataStore.edit { it[TOKEN_KEY] = token }
    }

    suspend fun getToken(): String? =
        context.dataStore.data.map { it[TOKEN_KEY] }.firstOrNull()

    suspend fun saveUserJson(json: String) {
        context.dataStore.edit { it[USER_JSON_KEY] = json }
    }

    suspend fun getUserJson(): String? =
        context.dataStore.data.map { it[USER_JSON_KEY] }.firstOrNull()

    suspend fun clear() {
        context.dataStore.edit { it.clear() }
    }
}
