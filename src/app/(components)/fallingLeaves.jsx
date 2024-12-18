import * as React from 'react';

export const FallingLeavesBackground = () => {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Handle resizing
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    class Leaf {
      constructor() {
        this.image = new Image();
        this.image.src = '/leaf.png'; // Replace with the path to your leaf image
        this.loaded = false;

        this.image.onload = () => {
          this.loaded = true;
        };

        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.width = 40 + Math.random() * 30; // Random width between 40 and 70px
        this.height = this.width; // square for simplicity
        this.speed = 1 + Math.random() * 3;
        this.angle = Math.random() * 2 * Math.PI;
        this.angularSpeed = Math.random() * 0.02 - 0.01; // Rotation speed
      }

      update() {
        this.y += this.speed;
        this.x += Math.sin(this.angle) * 2;
        this.angle += this.angularSpeed;

        if (this.y > canvas.height) {
          this.y = -this.height;
          this.x = Math.random() * canvas.width;
        }

        if (this.x > canvas.width) {
          this.x = 0;
        } else if (this.x < 0) {
          this.x = canvas.width;
        }
      }

      draw() {
        if (!this.loaded) return; // Only draw if image is loaded

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
      }
    }

    const leaves = [];
    for (let i = 0; i < 30; i++) { // Adjust number of leaves here
      leaves.push(new Leaf());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      leaves.forEach(leaf => {
        leaf.update();
        leaf.draw();
      });
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1
      }}
    />
  );
};
