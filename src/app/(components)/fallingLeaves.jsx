import * as React from 'react';

// Helper to pick a random item from an array
const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const FallingLeavesBackground = ({
  catMode = false,
  catScale = 2, // Make cats 2x larger (change as you like)
}) => {
  const canvasRef = React.useRef(null);
  const animationRef = React.useRef(null);

  // We'll store the "leaves" in refs so they persist across renders
  const backgroundItemsRef = React.useRef([]);
  const foregroundItemsRef = React.useRef([]);

  // 1) One-time creation of canvas + leaf objects
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // ---------- Leaf (or Cat!) Class ----------
    class Leaf {
      constructor({ blur, sizeMin, sizeMax, speedMin, speedMax }) {
        this.blur = blur;
        this.sizeMin = sizeMin;
        this.sizeMax = sizeMax;
        this.speedMin = speedMin;
        this.speedMax = speedMax;

        // Base size is chosen once at creation
        this.baseWidth = sizeMin + Math.random() * (sizeMax - sizeMin);
        this.width = this.baseWidth;   // will update in setImage if catMode is on
        this.height = this.width;
        
        this.speed = speedMin + Math.random() * (speedMax - speedMin);
        this.angle = Math.random() * 2 * Math.PI;
        this.angularSpeed = Math.random() * 0.05 - 0.01;
        
        // Random initial position
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        
        this.image = new Image();
        this.loaded = false;

        // By default, we assume catMode = false (leaves) at first;
        // the effect will call setImage(...) again if catMode is actually true.
        this.setImage(false, 1); 
      }

      setImage(catModeValue, catScaleValue) {
        let randint, imgPath;
        if (catModeValue) {
          // Suppose you have cat images '01.png', '02.png'
          randint = pickRandom([1, 2]);
          imgPath = `/cats/0${randint}.png`;
          // Scale size
          this.width = this.baseWidth * catScaleValue;
        } else {
          // Leaves
          randint = pickRandom([2, 4, 5]);
          imgPath = `/leafes1/${randint}.png`;
          // Restore original base size
          this.width = this.baseWidth;
        }
        this.height = this.width;

        this.loaded = false;
        this.image.src = imgPath;
        this.image.onload = () => {
          this.loaded = true;
        };
      }

      update(canvas) {
        this.y += this.speed;
        this.x += Math.sin(this.angle) * 1;
        this.angle += this.angularSpeed;

        // Respawn when out of screen
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

      draw(ctx) {
        if (!this.loaded) return;
        ctx.save();
        if (this.blur) {
          ctx.filter = 'blur(2px)';
        }
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(
          this.image,
          -this.width / 2,
          -this.height / 2,
          this.width,
          this.height
        );
        ctx.restore();
        if (this.blur) {
          ctx.filter = 'none';
        }
      }
    }

    // Create the background items once
    const backgroundItems = [];
    for (let i = 0; i < 10; i++) {
      backgroundItems.push(
        new Leaf({
          blur: true,
          sizeMin: 10,
          sizeMax: 20,
          speedMin: 0.1,
          speedMax: .5,
        })
      );
    }
    backgroundItemsRef.current = backgroundItems;

    // Create the foreground items once
    const foregroundItems = [];
    for (let i = 0; i < 20; i++) {
      foregroundItems.push(
        new Leaf({
          blur: false,
          sizeMin: 20,
          sizeMax: 30,
          speedMin: .5,
          speedMax: 1,
        })
      );
    }
    foregroundItemsRef.current = foregroundItems;

    // Handle resizing
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      backgroundItemsRef.current.forEach((leaf) => {
        leaf.update(canvas);
        leaf.draw(ctx);
      });
      foregroundItemsRef.current.forEach((leaf) => {
        leaf.update(canvas);
        leaf.draw(ctx);
      });

      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // 2) Update images (and sizes) whenever catMode changes
  React.useEffect(() => {
    backgroundItemsRef.current.forEach((leaf) => {
      leaf.setImage(catMode, catScale);
    });
    foregroundItemsRef.current.forEach((leaf) => {
      leaf.setImage(catMode, catScale);
    });
  }, [catMode, catScale]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    />
  );
};
