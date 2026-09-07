// Lightbox Logic Attached to Global Window
    window.openLightbox = function(imgSrc) {
        var modal = document.getElementById('imageLightbox');
        var modalImg = document.getElementById('lightboxImg');
        modalImg.src = imgSrc;
        modal.style.display = 'flex';
        // Allow rendering before transition applies
        setTimeout(function() { modal.classList.add('show'); }, 10);
        document.documentElement.style.overflow = 'hidden'; 
    };

    window.closeLightbox = function() {
        var modal = document.getElementById('imageLightbox');
        modal.classList.remove('show');
        setTimeout(function() { modal.style.display = 'none'; }, 300);
        document.documentElement.style.overflow = '';
    };

    // Close lightbox on clicking outside of the image
    window.addEventListener('click', function(event) {
        var modal = document.getElementById('imageLightbox');
        if (event.target === modal) {
            window.closeLightbox();
        }
    });

    window.toggleDescription = function(btn) {
        var descText = btn.previousElementSibling;
        if (descText.classList.contains('expanded')) {
            descText.classList.remove('expanded');
            btn.textContent = 'See more';
        } else {
            descText.classList.add('expanded');
            btn.textContent = 'See less';
        }
    };

    (function () {
        'use strict';

        var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        var intro = document.getElementById('intro');
        var hero = document.getElementById('top');
        var nav = document.getElementById('nav');
        var cursorGlow = document.getElementById('cursorGlow');
        
        var nameContainer = document.getElementById('introName');
        if (nameContainer) {
            var text = nameContainer.getAttribute('data-name');
            var html = '';
            for (var i = 0; i < text.length; i++) {
                if (text[i] === ' ') {
                    html += '<span class="space"></span>';
                } else {
                    html += '<span class="char" style="animation-delay: ' + (0.4 + i * 0.04) + 's">' + text[i] + '</span>';
                }
            }
            nameContainer.innerHTML = html;
        }

        if (intro) {
            if (sessionStorage.getItem('introPlayed')) {
                intro.style.display = 'none';
                document.documentElement.style.overflow = '';
                if(hero) hero.classList.add('loaded');
                setTimeout(function() { nav.classList.add('show'); }, 100);
            } else {
                document.documentElement.style.overflow = 'hidden';
                var skipIntro = function() {
                    intro.classList.add('exit');
                    document.documentElement.style.overflow = '';
                    sessionStorage.setItem('introPlayed', 'true');
                    setTimeout(function() { intro.style.display = 'none'; }, 900);
                    if(hero) hero.classList.add('loaded');
                    setTimeout(function() { nav.classList.add('show'); }, 600);
                };
                intro.addEventListener('click', skipIntro);
                setTimeout(skipIntro, 4000);
            }
        }

        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                nav.style.background = 'color-mix(in srgb, var(--bg) 85%, transparent)';
                nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
            } else {
                nav.style.background = 'color-mix(in srgb, var(--bg) 75%, transparent)';
                nav.style.boxShadow = 'none';
            }
        }, { passive: true });

        if (!reduceMotion && cursorGlow) {
            window.addEventListener('mousemove', function(e) {
                requestAnimationFrame(function() {
                    cursorGlow.style.transform = 'translate(' + (e.clientX - 210) + 'px, ' + (e.clientY - 210) + 'px)';
                });
            }, { passive: true });
        }

        if ('IntersectionObserver' in window && !reduceMotion) {
            var observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

            document.querySelectorAll('.reveal, .reveal-scale').forEach(function(el) {
                observer.observe(el);
            });
        } else {
            document.querySelectorAll('.reveal, .reveal-scale').forEach(function(el) {
                el.classList.add('visible');
            });
        }

        var filters = document.querySelectorAll('.filter');
        var cards = document.querySelectorAll('.card');
        
        filters.forEach(function(btn) {
            btn.addEventListener('click', function() {
                filters.forEach(function(f) { 
                    f.classList.remove('on');
                    f.setAttribute('aria-pressed', 'false');
                });
                this.classList.add('on');
                this.setAttribute('aria-pressed', 'true');
                
                var filterValue = this.getAttribute('data-filter');
                
                cards.forEach(function(card) {
                    if (filterValue === 'all' || card.getAttribute('data-cat') === filterValue) {
                        card.classList.remove('is-hidden');
                        setTimeout(function(){ card.style.opacity = '1'; card.style.transform = 'none'; }, 50);
                    } else {
                        card.style.opacity = '0'; card.style.transform = 'scale(0.95)';
                        setTimeout(function(){ card.classList.add('is-hidden'); }, 300);
                    }
                });
            });
        });

        document.getElementById('year').textContent = new Date().getFullYear();

    })();