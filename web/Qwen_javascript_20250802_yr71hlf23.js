// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId).classList.add('active');
            
            // Update URL hash
            window.location.hash = targetId;
        });
    });
    
    // Check URL hash on load
    function checkHash() {
        const hash = window.location.hash.substring(1) || 'home';
        navLinks.forEach(l => l.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active'));
        
        const activeLink = document.querySelector(`[href="#${hash}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        const activeSection = document.getElementById(hash);
        if (activeSection) {
            activeSection.classList.add('active');
        }
    }
    
    window.addEventListener('hashchange', checkHash);
    checkHash();
    
    // Modal functionality
    const editProfileBtn = document.getElementById('editProfileBtn');
    const addPostBtn = document.getElementById('addPostBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const closePostModalBtn = document.getElementById('closePostModalBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const cancelPostBtn = document.getElementById('cancelPostBtn');
    const editProfileModal = document.getElementById('editProfileModal');
    const addPostModal = document.getElementById('addPostModal');
    
    // Open modals
    editProfileBtn.addEventListener('click', () => {
        editProfileModal.classList.add('active');
    });
    
    addPostBtn.addEventListener('click', () => {
        addPostModal.classList.add('active');
    });
    
    // Close modals
    function closeModals() {
        editProfileModal.classList.remove('active');
        addPostModal.classList.remove('active');
    }
    
    closeModalBtn.addEventListener('click', closeModals);
    closePostModalBtn.addEventListener('click', closeModals);
    cancelEditBtn.addEventListener('click', closeModals);
    cancelPostBtn.addEventListener('click', closeModals);
    
    // Close modal when clicking outside
    editProfileModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeModals();
        }
    });
    
    addPostModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeModals();
        }
    });
    
    // Save profile changes
    document.getElementById('saveProfileBtn').addEventListener('click', function() {
        // In a real application, you would save to localStorage or a backend
        showToast('Profile updated successfully!');
        closeModals();
    });
    
    // Publish new post
    document.getElementById('publishPostBtn').addEventListener('click', function() {
        const title = document.getElementById('postTitle').value;
        const content = document.getElementById('postContent').value;
        
        if (!title || !content) {
            alert('Please fill in both title and content');
            return;
        }
        
        // In a real application, you would add the post to the DOM
        showToast('Post published successfully!');
        closeModals();
        
        // Clear form
        document.getElementById('postTitle').value = '';
        document.getElementById('postImage').value = '';
        document.getElementById('postContent').value = '';
        document.getElementById('postType').value = 'blog';
    });
    
    // Like functionality
    document.querySelectorAll('.like-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const postId = this.getAttribute('data-post-id');
            const likesSpan = document.getElementById(`likes-${postId}`);
            let currentLikes = parseInt(likesSpan.textContent);
            likesSpan.textContent = currentLikes + 1;
            
            this.style.color = '#ef4444';
            this.innerHTML = '<i class="fas fa-thumbs-up"></i> ' + (currentLikes + 1);
            
            // Disable further clicking
            this.disabled = true;
            this.style.cursor = 'default';
        });
    });
    
    // Toast notification
    function showToast(message) {
        const toast = document.getElementById('successToast');
        document.getElementById('toastMessage').textContent = message;
        toast.classList.add('active');
        
        setTimeout(() => {
            toast.classList.remove('active');
        }, 3000);
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Update URL hash
                history.pushState(null, null, `#${targetId}`);
            }
        });
    });
    
    // Form submission
    document.querySelector('.contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        showToast('Message sent successfully! I\'ll get back to you soon.');
        this.reset();
    });
});