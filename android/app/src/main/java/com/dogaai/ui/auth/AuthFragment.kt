package com.dogaai.ui.auth

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.core.view.isVisible
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.lifecycle.lifecycleScope
import androidx.navigation.fragment.findNavController
import com.dogaai.R
import com.dogaai.databinding.FragmentAuthBinding
import dagger.hilt.android.AndroidEntryPoint
import kotlinx.coroutines.flow.collectLatest
import kotlinx.coroutines.launch

@AndroidEntryPoint
class AuthFragment : Fragment() {

    private var _binding: FragmentAuthBinding? = null
    private val binding get() = _binding!!
    private val vm: AuthViewModel by viewModels()
    private var isLoginMode = true

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?
    ): View {
        _binding = FragmentAuthBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding.btnToggleMode.setOnClickListener {
            isLoginMode = !isLoginMode
            updateModeUi()
        }

        binding.btnSubmit.setOnClickListener { handleSubmit() }

        binding.btnGuest.setOnClickListener {
            findNavController().navigate(R.id.action_auth_to_home)
        }

        lifecycleScope.launch {
            vm.state.collectLatest { state ->
                binding.progressBar.isVisible = state.loading
                binding.btnSubmit.isEnabled = !state.loading

                state.error?.let {
                    Toast.makeText(requireContext(), it, Toast.LENGTH_LONG).show()
                    vm.clearError()
                }

                if (state.isLoggedIn) {
                    findNavController().navigate(R.id.action_auth_to_home)
                }
            }
        }
    }

    private fun updateModeUi() {
        binding.layoutUsername.isVisible = !isLoginMode
        binding.layoutFullname.isVisible = !isLoginMode
        binding.btnSubmit.text = if (isLoginMode) "Giriş Yap" else "Kayıt Ol"
        binding.btnToggleMode.text = if (isLoginMode) "Hesap oluştur →" else "Zaten üyeyim →"
    }

    private fun handleSubmit() {
        val email = binding.etEmail.text.toString().trim()
        val password = binding.etPassword.text.toString()
        if (isLoginMode) {
            vm.login(email, password)
        } else {
            val username = binding.etUsername.text.toString().trim()
            val fullName = binding.etFullname.text.toString().trim()
            vm.register(username, email, password, fullName)
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
