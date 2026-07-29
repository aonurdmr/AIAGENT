package com.dogaai.data.repository

import com.dogaai.data.api.ApiService
import com.dogaai.data.db.TokenStore
import com.dogaai.data.model.*
import com.google.gson.Gson
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import javax.inject.Inject
import javax.inject.Singleton

sealed class Result<out T> {
    data class Success<T>(val data: T) : Result<T>()
    data class Error(val message: String) : Result<Nothing>()
    object Loading : Result<Nothing>()
}

@Singleton
class AuthRepository @Inject constructor(
    private val api: ApiService,
    private val tokenStore: TokenStore,
    private val gson: Gson
) {
    suspend fun login(email: String, password: String): Result<UserPublic> {
        return try {
            val response = api.login(LoginRequest(email, password))
            if (response.isSuccessful) {
                val body = response.body()!!
                tokenStore.saveToken(body.token)
                tokenStore.saveUserJson(gson.toJson(body.user))
                Result.Success(body.user)
            } else {
                Result.Error("Giriş başarısız: ${response.code()}")
            }
        } catch (e: Exception) {
            Result.Error(e.message ?: "Bağlantı hatası")
        }
    }

    suspend fun register(
        username: String, email: String, password: String, fullName: String
    ): Result<UserPublic> {
        return try {
            val response = api.register(RegisterRequest(username, email, password, fullName))
            if (response.isSuccessful) {
                val body = response.body()!!
                tokenStore.saveToken(body.token)
                tokenStore.saveUserJson(gson.toJson(body.user))
                Result.Success(body.user)
            } else {
                Result.Error("Kayıt başarısız: ${response.code()}")
            }
        } catch (e: Exception) {
            Result.Error(e.message ?: "Bağlantı hatası")
        }
    }

    suspend fun getMe(): Result<UserPublic> {
        return try {
            val response = api.getMe()
            if (response.isSuccessful) Result.Success(response.body()!!)
            else Result.Error("Oturum süresi doldu")
        } catch (e: Exception) {
            Result.Error(e.message ?: "Bağlantı hatası")
        }
    }

    suspend fun logout() = tokenStore.clear()

    suspend fun getCachedUser(): UserPublic? {
        val json = tokenStore.getUserJson() ?: return null
        return try { gson.fromJson(json, UserPublic::class.java) } catch (e: Exception) { null }
    }

    suspend fun isLoggedIn(): Boolean = tokenStore.getToken() != null
}
