// background-animator.js - File JavaScript yang dapat diimpor dan digunakan kembali

class BackgroundAnimator {
    constructor(canvasId, options = {}) {
      // Mengambil elemen canvas
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) {
        throw new Error(`Canvas dengan id ${canvasId} tidak ditemukan`);
      }
      
      this.ctx = this.canvas.getContext('2d');
      
      // Opsi default
      this.options = {
        particleCount: options.particleCount || 100,
        mouseRadius: options.mouseRadius || 150,
        particleColor: options.particleColor || 'blue',
        backgroundColor: options.backgroundColor || { from: '#1a1a2e', to: '#16213e' },
        lineDistance: options.lineDistance || 100,
        enableMouseInteraction: options.enableMouseInteraction !== false,
        enableClickEffects: options.enableClickEffects !== false
      };
      
      // Inisialisasi array
      this.particles = [];
      this.ripples = [];
      
      // Mengatur mouse
      this.mouse = {
        x: null,
        y: null,
        radius: this.options.mouseRadius
      };
      
      // Memanggil metode inisialisasi
      this.init();
    }
    
    init() {
      // Mengatur ukuran canvas
      this.setupCanvas();
      
      // Membuat partikel
      this.createParticles();
      
      // Menambahkan event listeners
      this.addEventListeners();
      
      // Memulai animasi
      this.animate();
    }
    
    setupCanvas() {
      const resizeCanvas = () => {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
      };
      
      window.addEventListener('resize', resizeCanvas);
      resizeCanvas();
      
      // Mengatur style canvas
      this.canvas.style.position = 'fixed';
      this.canvas.style.top = '0';
      this.canvas.style.left = '0';
      this.canvas.style.width = '100%';
      this.canvas.style.height = '100%';
      this.canvas.style.zIndex = '-1';
      this.canvas.style.cursor = 'pointer';
    }
    
    createParticles() {
      for (let i = 0; i < this.options.particleCount; i++) {
        this.particles.push(new Particle(this.canvas, this.options));
      }
    }
    
    addEventListeners() {
      if (this.options.enableMouseInteraction) {
        window.addEventListener('mousemove', (event) => {
          this.mouse.x = event.x;
          this.mouse.y = event.y;
        });
      }
      
      if (this.options.enableClickEffects) {
        this.canvas.addEventListener('click', (event) => {
          const x = event.x;
          const y = event.y;
          
          // Menambahkan ripple effect
          this.ripples.push(new Ripple(x, y));
          
          // Membuat partikel ledakan
          for (let i = 0; i < 20; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 5 + 2;
            const size = Math.random() * 8 + 2;
            
            const speedX = Math.cos(angle) * speed;
            const speedY = Math.sin(angle) * speed;
            
            // Warna acak
            const hue = Math.random() * 360;
            const color = `hsl(${hue}, 80%, 60%)`;
            
            this.particles.push(new Particle(
              this.canvas, 
              this.options, 
              x, y, size, speedX, speedY, color, true
            ));
          }
          
          // Efek flash
          this.ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
          this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        });
      }
    }
    
    animate() {
      // Membersihkan canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      // Membuat gradient background
      const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
      gradient.addColorStop(0, this.options.backgroundColor.from);
      gradient.addColorStop(1, this.options.backgroundColor.to);
      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      
      // Update dan gambar ripples
      for (let i = 0; i < this.ripples.length; i++) {
        this.ripples[i].update();
        this.ripples[i].draw(this.ctx);
        
        if (this.ripples[i].isFinished()) {
          this.ripples.splice(i, 1);
          i--;
        }
      }
      
      // Update dan gambar partikel
      for (let i = 0; i < this.particles.length; i++) {
        this.particles[i].update(this.mouse);
        this.particles[i].draw(this.ctx);
        
        // Hapus partikel klik jika masa hidupnya habis
        if (this.particles[i].isClickParticle && this.particles[i].lifetime <= 0) {
          this.particles.splice(i, 1);
          i--;
          continue;
        }
        
        // Menghubungkan partikel dengan garis
        for (let j = i; j < this.particles.length; j++) {
          const dx = this.particles[i].x - this.particles[j].x;
          const dy = this.particles[i].y - this.particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < this.options.lineDistance) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance/this.options.lineDistance})`;
            this.ctx.lineWidth = 0.5;
            this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
            this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
            this.ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(this.animate.bind(this));
    }
  }
  
  // Class Particle
  class Particle {
    constructor(canvas, options, x, y, size, speedX, speedY, color, isClickParticle = false) {
      this.canvas = canvas;
      this.x = x || Math.random() * canvas.width;
      this.y = y || Math.random() * canvas.height;
      this.size = size || Math.random() * 5 + 1;
      this.speedX = speedX || Math.random() * 3 - 1.5;
      this.speedY = speedY || Math.random() * 3 - 1.5;
      
      if (color) {
        this.color = color;
      } else if (options.particleColor === 'random') {
        this.color = `hsl(${Math.random() * 60 + 200}, 70%, 50%)`;
      } else {
        this.color = options.particleColor;
      }
      
      this.lifetime = 100; // Lifetime for click particles
      this.isClickParticle = isClickParticle;
    }
    
    update(mouse) {
      this.x += this.speedX;
      this.y += this.speedY;
      
      // Reduce lifetime for click particles
      if (this.isClickParticle) {
        this.lifetime -= 1;
        this.size *= 0.96; // Slowly shrink
      }
      
      // Memantulkan partikel
      if (this.x < 0 || this.x > this.canvas.width) {
        this.speedX = -this.speedX;
      }
      if (this.y < 0 || this.y > this.canvas.height) {
        this.speedY = -this.speedY;
      }
      
      // Interaksi dengan mouse
      if (mouse.x && mouse.y) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouse.radius - distance) / mouse.radius;
          
          this.x += forceDirectionX * force * 2;
          this.y += forceDirectionY * force * 2;
        }
      }
    }
    
    draw(ctx) {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  // Class Ripple
  class Ripple {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.radius = 1;
      this.maxRadius = 100;
      this.opacity = 1;
      this.speed = 3;
    }
    
    update() {
      this.radius += this.speed;
      this.opacity = 1 - (this.radius / this.maxRadius);
    }
    
    draw(ctx) {
      ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.stroke();
    }
    
    isFinished() {
      return this.radius >= this.maxRadius;
    }
  }
  
  // Ekspor class untuk digunakan
  export { BackgroundAnimator };