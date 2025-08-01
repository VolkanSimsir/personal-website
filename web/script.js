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
            
            // Update URL hash (safely)
            try {
                window.location.hash = targetId;
            } catch (e) {
                // Handle security error in sandboxed environments
                console.log('Unable to update URL hash in this environment');
            }
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
    
    // Admin Panel functionality
    const adminPanelBtn = document.getElementById('adminPanelBtn');
    const closeAdminPanel = document.getElementById('closeAdminPanel');
    const adminPanel = document.getElementById('adminPanel');
    
    // Open admin panel
    adminPanelBtn.addEventListener('click', () => {
        adminPanel.classList.add('active');
    });
    
    // Close admin panel
    closeAdminPanel.addEventListener('click', () => {
        adminPanel.classList.remove('active');
    });
    
    // Close admin panel when clicking outside
    adminPanel.addEventListener('click', function(e) {
        if (e.target === this) {
            adminPanel.classList.remove('active');
        }
    });
    
    // Save biography
    document.getElementById('saveBioBtn').addEventListener('click', function() {
        const bioContent = document.getElementById('bioEditor').value;
        document.querySelector('.bio').textContent = bioContent;
        showToast('Biography updated successfully!');
    });
    
    // Add new project
    document.getElementById('addProjectBtn').addEventListener('click', function() {
        const title = document.getElementById('projectTitle').value;
        const description = document.getElementById('projectDescription').value;
        const image = document.getElementById('projectImage').value;
        const tech = document.getElementById('projectTech').value;
        const liveUrl = document.getElementById('projectLiveUrl').value;
        const githubUrl = document.getElementById('projectGithubUrl').value;
        
        if (!title || !description) {
            showToast('Please fill in title and description', 'error');
            return;
        }
        
        // In a real implementation, this would add to the projects grid
        showToast('Project added successfully!');
        
        // Clear form
        document.getElementById('projectTitle').value = '';
        document.getElementById('projectDescription').value = '';
        document.getElementById('projectImage').value = '';
        document.getElementById('projectTech').value = '';
        document.getElementById('projectLiveUrl').value = '';
        document.getElementById('projectGithubUrl').value = '';
    });
    
    // Add new blog post
    document.getElementById('addPostBtn').addEventListener('click', function() {
        const title = document.getElementById('postTitle').value;
        const type = document.getElementById('postType').value;
        const image = document.getElementById('postImage').value;
        const content = document.getElementById('postContent').value;
        
        if (!title || !content) {
            showToast('Please fill in title and content', 'error');
            return;
        }
        
        // In a real implementation, this would add to the blog posts
        showToast('Blog post added successfully!');
        
        // Clear form
        document.getElementById('postTitle').value = '';
        document.getElementById('postType').value = 'blog';
        document.getElementById('postImage').value = '';
        document.getElementById('postContent').value = '';
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
    
    // Contact form submission
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const subject = document.getElementById('contactSubject').value;
        const message = document.getElementById('contactMessage').value;
        
        // In a real implementation, this would send an email
        console.log('Contact Form Submission:', { name, email, subject, message });
        
        showToast('Message sent successfully! I\'ll get back to you soon.');
        this.reset();
    });
    
    // Appointment form submission
    document.getElementById('appointmentForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('appointmentName').value;
        const email = document.getElementById('appointmentEmail').value;
        const date = document.getElementById('appointmentDate').value;
        const time = document.getElementById('appointmentTime').value;
        const purpose = document.getElementById('appointmentPurpose').value;
        
        // In a real implementation, this would send an email notification
        console.log('Appointment Request:', { name, email, date, time, purpose });
        
        showToast('Appointment request sent! I\'ll confirm the details with you soon.');
        this.reset();
    });
    
    // Toast notification
    function showToast(message, type = 'success') {
        const toast = document.getElementById('successToast');
        document.getElementById('toastMessage').textContent = message;
        
        if (type === 'error') {
            toast.style.background = 'var(--danger)';
        } else {
            toast.style.background = 'var(--success)';
        }
        
        toast.classList.add('active');
        
        setTimeout(() => {
            toast.classList.remove('active');
        }, 3000);
    }
    
    // Smooth scrolling for navigation links (without pushState)
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
            }
        });
    });
});