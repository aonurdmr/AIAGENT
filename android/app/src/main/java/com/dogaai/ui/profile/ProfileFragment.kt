package com.dogaai.ui.profile

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.lifecycle.lifecycleScope
import androidx.navigation.fragment.findNavController
import com.dogaai.R
import com.dogaai.databinding.FragmentProfileBinding
import dagger.hilt.android.AndroidEntryPoint
import kotlinx.coroutines.flow.collectLatest
import kotlinx.coroutines.launch

@AndroidEntryPoint
class ProfileFragment : Fragment() {

    private var _binding: FragmentProfileBinding? = null
    private val binding get() = _binding!!
    private val vm: ProfileViewModel by viewModels()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?
    ): View {
        _binding = FragmentProfileBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding.btnLogout.setOnClickListener { vm.logout() }

        lifecycleScope.launch {
            vm.state.collectLatest { state ->
                state.user?.let { user ->
                    binding.tvUsername.text = "@${user.username}"
                    binding.tvFullname.text = user.fullName.ifEmpty { user.username }
                    binding.tvBio.text = user.bio
                    binding.tvStatCatches.text = user.totalCatches.toString()
                    binding.tvStatActivities.text = user.totalActivities.toString()
                    binding.tvAvatarInitial.text = user.username.first().uppercase()
                }
                if (state.loggedOut) {
                    findNavController().navigate(R.id.authFragment)
                }
            }
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
