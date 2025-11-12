'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';

function AnimatedSphere() {
  return (
    <Sphere visible args={[1, 100, 200]} scale={2}>
      <MeshDistortMaterial
        color="#2563eb"
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0}
      />
    </Sphere>
  );
}

export default function ThreeScene() {
  return (
    <motion.div 
      className="absolute inset-0 -z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <Canvas>
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <AnimatedSphere />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </motion.div>
  );
}