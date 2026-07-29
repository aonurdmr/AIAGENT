package com.dogaai.ui

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import androidx.navigation.fragment.NavHostFragment
import androidx.navigation.ui.setupWithNavController
import com.dogaai.R
import com.dogaai.databinding.ActivityMainBinding
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        installSplashScreen()
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val navHost = supportFragmentManager
            .findFragmentById(R.id.nav_host_fragment) as NavHostFragment
        val navController = navHost.navController

        binding.bottomNav.setupWithNavController(navController)

        // Hide bottom nav on auth screens
        navController.addOnDestinationChangedListener { _, dest, _ ->
            val hideOn = setOf(R.id.authFragment, R.id.identifyResultFragment, R.id.chatFragment)
            binding.bottomNav.visibility = if (dest.id in hideOn)
                android.view.View.GONE else android.view.View.VISIBLE
        }
    }
}
