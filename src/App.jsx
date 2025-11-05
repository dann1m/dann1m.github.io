import React, { useState, useEffect, useRef } from 'react';
import { Gamepad2, Code, Palette, Box, Sparkles, ChevronDown, X, Briefcase, Award, Mail, Github, Linkedin } from 'lucide-react';
import {SiPython} from "react-icons/si";


import './App.css';

export default function Portfolio() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedProject, setSelectedProject] = useState(null);
  const [artMode, setArtMode] = useState(false);
  const [particles, setParticles] = useState([]);
  const canvasRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Particle system
  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.3
    }));
    setParticles(newParticles);

    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        x: (p.x + p.speedX + 100) % 100,
        y: (p.y + p.speedY + 100) % 100
      })));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Three.js-style 3D cube
  useEffect(() => {
    if (artMode) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 400;

    let rotation = 0;
    const animate = () => {
      ctx.clearRect(0, 0, 400, 400);
      rotation += 0.01;

      const centerX = 200;
      const centerY = 200;
      const size = 80;

      // Draw rotating cube wireframe
      const points3D = [
        [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
        [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
      ];

      const rotatedPoints = points3D.map(([x, y, z]) => {
        // Rotate around Y axis
        const cosY = Math.cos(rotation);
        const sinY = Math.sin(rotation);
        const x1 = x * cosY - z * sinY;
        const z1 = x * sinY + z * cosY;
        
        // Rotate around X axis
        const cosX = Math.cos(rotation * 0.7);
        const sinX = Math.sin(rotation * 0.7);
        const y1 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        // Project to 2D
        const scale = 200 / (200 + z2);
        return [centerX + x1 * size * scale, centerY + y1 * size * scale];
      });

      // Draw edges
      const edges = [
        [0,1],[1,2],[2,3],[3,0], // Back face
        [4,5],[5,6],[6,7],[7,4], // Front face
        [0,4],[1,5],[2,6],[3,7]  // Connecting edges
      ];

      ctx.strokeStyle = 'rgba(34, 211, 238, 0.8)';
      ctx.lineWidth = 2;

      edges.forEach(([i, j]) => {
        ctx.beginPath();
        ctx.moveTo(rotatedPoints[i][0], rotatedPoints[i][1]);
        ctx.lineTo(rotatedPoints[j][0], rotatedPoints[j][1]);
        ctx.stroke();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, [artMode]);

  const projects = [
    {
      title: "Deadalus",
      icon: Gamepad2,
      image: "/deadalus.png",
      color: "from-cyan-500 to-blue-500",
      tags: ["Java", "Figma", "Procreate", "Game Design"],
      description: "2D survival tower defense game with handmade traps and shadowed labyrinths. Outsmart mythological enemies with strategic trap mechanics. Won Most Polished and Player Choice at the GDIAC showcase.",
      highlights: ["Fog of War", "Strategic Trap Mechanics", "Object-Oriented Logic"],
      bgColor: "from-purple-400/20 to-pink-400/20",
      buttons: [
      { label: "Download Now", url: "https://greek-frog-studios.itch.io/deadalus" },
      { label: "See Trailer", url: "https://www.youtube.com/watch?v=NU5nywNDaag" }
      ]
    },
    {
      title: "Elemental Quest",
      icon: Box,
      image: "/elemental quest.png",
      color: "from-pink-500 to-purple-500",
      tags: ["Unity", "C#", "Piskel", "Photoshop"],
      description: "2D platformer game with elemental runes and challenging levels. Players solve puzzles, avoid traps, and use elemental powers to progress. Blends exploration, strategy, and magic in a beautifully crafted 2D world.",
      highlights: ["Puzzle Mechanics", "Solo Dev", "Environmental Interaction"],
      bgColor: "from-blue-400/20 to-purple-400/20",
      buttons: [
      { label: "Play Prototype", url: "https://elementalquest.d2kyv1weydh8sx.amplifyapp.com/" },
      { label: "See on Github", url: "https://github.com/dann1m/elemental_quest" }
    ]
    },
    {
      title: "Camera Manager Tool",
      icon: Code,
      color: "from-lime-500 to-green-500",
      image: "/camera manager.jpg",
      tags: ["Python", "Maya", "MEL", "Tool Development"],
      description: "Python tool for managing cameras in Autodesk Maya. Easily create, delete, rename, lock/unlock, duplicate, export, and import cameras through a clean UI.",
      highlights: ["Camera Management", "Technical Direction", "Quick Action"],
      bgColor: "from-cyan-400/20 to-teal-400/20",
      buttons: [
      { label: "Download Tool", url: "https://github.com/dann1m/maya-camera-manager/archive/refs/heads/main.zip" },
      { label: "See Code", url: "https://github.com/dann1m/maya-camera-manager" }
    ]
    },
    {
      title: "Trinity Blocks",
      icon: Palette,
      image: "/trinity blocks.jpg",
      color: "from-orange-500 to-red-500",
      tags: ["Unity", "C#", "Procreate", "Game Design"],
      description: "2D puzzle platformer where each level gives players three blocks with unique abilities. Combine Jump, Speed, and Float blocks to reach the end and solve creative puzzles. Inspired by the game jam theme, 'Third time’s the charm.'",
      highlights: ["Puzzle Mechanics", "Game Jam", "2D Art"],
      bgColor: "from-green-400/20 to-emerald-400/20",
      buttons: [
      { label: "Play Game Jam Build", url: "https://dann1m.itch.io/trinity-blocks" },
      { label: "See Code", url: "https://github.com/agamatlab/Magnify" }
    ]
    }
  ];


  // const artworks = [
  //   { title: "Sunset Dreams", medium: "Digital Painting", color: "bg-gradient-to-br from-orange-300 to-pink-400" },
  //   { title: "Urban Sketches", medium: "Ink & Watercolor", color: "bg-gradient-to-br from-slate-400 to-blue-300" },
  //   { title: "Character Studies", medium: "Digital Illustration", color: "bg-gradient-to-br from-purple-300 to-pink-300" },
  //   { title: "Abstract Forms", medium: "Mixed Media", color: "bg-gradient-to-br from-teal-300 to-cyan-400" },
  //   { title: "Nature Series", medium: "Oil Painting", color: "bg-gradient-to-br from-green-300 to-emerald-400" },
  //   { title: "Portrait Collection", medium: "Charcoal", color: "bg-gradient-to-br from-amber-300 to-orange-400" },
  // ];

  // const skills = [
  //   { name: "Game Development", level: 90, color: "cyan" },
  //   { name: "3D Modeling & Animation", level: 85, color: "purple" },
  //   { name: "Technical Direction", level: 80, color: "pink" },
  //   { name: "VR/AR Development", level: 75, color: "lime" },
  //   { name: "UI/UX Design", level: 70, color: "orange" }
  // ];

  // const getColorClass = (color) => {
  //   const colors = {
  //     cyan: "bg-cyan-500",
  //     purple: "bg-purple-500",
  //     pink: "bg-pink-500",
  //     lime: "bg-lime-500",
  //     orange: "bg-orange-500"
  //   };
  //   return colors[color] || "bg-cyan-500";
  // };

  // if (artMode) {
  //   return (
  //     <div className="min-h-screen w-full bg-gradient-to-br from-stone-50 via-amber-50 to-rose-50 text-stone-800 transition-all duration-1000">
  //       {/* Art Mode Navigation */}
  //       <nav className="fixed top-0 left-0 right-0 w-full z-40 backdrop-blur-md bg-white/80 border-b border-stone-200">
  //         <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
  //           <div className="text-2xl font-bold text-stone-800">
  //             Art Gallery
  //           </div>
  //           <button
  //             onClick={() => setArtMode(false)}
  //             className="px-6 py-2 bg-stone-800 text-white rounded-full hover:bg-stone-700 transition-all duration-300 flex items-center gap-2"
  //           >
  //             <Sparkles className="w-4 h-4" />
  //             Back to Tech
  //           </button>
  //         </div>
  //       </nav>

  //       {/* Gallery */}
  //       <section className="pt-32 pb-20 px-6">
  //         <div className="max-w-7xl mx-auto">
  //           <div className="text-center mb-16">
  //             <h1 className="text-5xl md:text-6xl font-bold mb-4 text-stone-800">
  //               Creative Works
  //             </h1>
  //             <p className="text-xl text-stone-600">
  //               Exploring color, form, and emotion through traditional and digital media
  //             </p>
  //           </div>

  //           {/* Masonry-style gallery */}
  //           <div className="grid md:grid-cols-3 gap-6">
  //             {artworks.map((art, i) => (
  //               <div
  //                 key={i}
  //                 className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer"
  //                 style={{ height: i % 3 === 0 ? '400px' : i % 3 === 1 ? '320px' : '360px' }}
  //               >
  //                 <div className={`absolute inset-0 ${art.color} group-hover:scale-110 transition-transform duration-700`} />
  //                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
  //                 <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-500">
  //                   <h3 className="text-2xl font-bold mb-2">{art.title}</h3>
  //                   <p className="text-sm opacity-90">{art.medium}</p>
  //                 </div>

  //                 {/* Placeholder for actual art */}
  //                 <div className="absolute inset-0 flex items-center justify-center text-white/30">
  //                   <Palette className="w-20 h-20" />
  //                 </div>
  //               </div>
  //             ))}
  //           </div>

  //           <div className="text-center mt-16">
  //             <p className="text-stone-600 italic">
  //               "Art is where the technical mind rests and the creative spirit plays"
  //             </p>
  //           </div>
  //         </div>
  //       </section>
  //     </div>
  //   );
  // }

  if (artMode) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-stone-50 via-amber-50 to-rose-50 text-stone-800 transition-all duration-1000 flex flex-col items-center justify-center">
        {/* Art Mode Navigation */}
        <nav className="fixed top-0 left-0 right-0 w-full z-40 backdrop-blur-md bg-white/80 border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold text-stone-800">
              Art Gallery
            </div>
            <button
              onClick={() => setArtMode(false)}
              className="px-6 py-2 bg-stone-800 text-white rounded-full hover:bg-stone-700 transition-all duration-300 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Back to Tech
            </button>
          </div>
        </nav>

        {/* Coming Soon Section */}
        <section className="pt-32 text-center px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Coming Soon</h1>
          <p className="text-xl text-stone-600 mb-8">
            My full art gallery is on my other portfolio website for now.
          </p>
          <a
            href="https://diigital.art"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-stone-800 text-white rounded-full hover:bg-stone-700 transition-all duration-300"
          >
            Visit My Art Portfolio
          </a>
        </section>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated particles */}
      {!artMode && particles.map(p => (
        <div
          key={p.id}
          className="fixed w-1 h-1 bg-cyan-400 rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.opacity,
            boxShadow: '0 0 4px rgba(34, 211, 238, 0.8)'
          }}
        />
      ))}

      {/* Cursor trail */}
      <div 
        className="fixed w-4 h-4 rounded-full bg-cyan-400 pointer-events-none z-50 mix-blend-screen transition-transform duration-100"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          transform: 'translate(-50%, -50%)',
          opacity: 0.6
        }}
      />
      
      {/* Floating background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute top-40 right-10 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 w-full z-40 backdrop-blur-md bg-slate-900/50 border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Danielle Imogu
          </div>
          <div className="flex gap-8 items-center text-sm">
            {['Work', 'About', 'Skills', 'Contact'].map((item) => (
              <button
                key={item}
                className="hover:text-cyan-400 transition-colors duration-300 relative group"
                onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
            <button
              onClick={() => setArtMode(true)}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-rose-500 rounded-full font-semibold hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <Palette className="w-4 h-4" />
              Art Gallery
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-400/30 backdrop-blur-sm animate-pulse">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-400">Available for opportunities</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Creative
              </span>
              <br />
              meets
              <br />
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Technical
              </span>
            </h1>
            
            <p className="text-xl text-slate-300 leading-relaxed">
              I bridge creativity and technology to bring ideas to life through interactive experiences. Whether developing games, animating characters, or designing immersive systems in VR, I focus on how people connect, play, and communicate.
            </p>
            
            <div className="flex gap-4">
              <button 
                onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
              >
                View Projects
              </button>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 border-2 border-purple-400 rounded-full font-semibold hover:bg-purple-400/10 transition-all duration-300"
              >
                Get in Touch
              </button>
            </div>
          </div>

          {/* 3D Canvas */}
          <div className="relative h-96 flex items-center justify-center">
            <canvas
              ref={canvasRef}
              className="max-w-full"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(34, 211, 238, 0.5))'
              }}
            />
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-purple-400" />
        </div>
      </section>

      {/* Projects Section */}
      <section id="work" className="relative py-20 px-6 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
            <p className="text-slate-400 text-lg">Explore my worlds of code, art, and play</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <div
                key={i}
                onClick={() => setSelectedProject(project)}
                className="group bg-slate-800/30 backdrop-blur-sm rounded-3xl border border-purple-500/20 overflow-hidden hover:border-cyan-400/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/10 cursor-pointer"
              >
                {/* Project Image */}
                <div className={`relative h-64 bg-gradient-to-br ${project.bgColor} overflow-hidden`}>
                  {/* Actual image */}
                  <img
                    src={project.image}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <project.icon className="w-24 h-24 text-white/20" />
                  </div>



                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                  
                  {/* GitHub icon in corner */}
                  <div className="absolute top-4 right-4 p-2 bg-slate-900/50 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Github className="w-5 h-5" />
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  <div className="flex gap-2 flex-wrap mb-4">
                    {project.tags.map((tag, j) => (
                      <span
                        key={j}
                        className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-slate-300 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  <div className="flex gap-2 flex-wrap">
                    {project.highlights.map((highlight, j) => (
                      <span
                        key={j}
                        className="px-3 py-1 bg-purple-500/10 border border-purple-400/20 rounded-full text-sm text-purple-300"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      {/* <section id="skills" className="relative py-20 px-6 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Skill Tree
              </span>
            </h2>
            <p className="text-slate-400 text-lg">Level up across multiple disciplines</p>
          </div>

          <div className="space-y-8">
            {skills.map((skill, i) => (
              <div key={i} className="group">
                <div className="flex justify-between mb-2">
                  <span className="text-lg font-semibold">{skill.name}</span>
                  <span className="text-cyan-400">{skill.level}%</span>
                </div>
                <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getColorClass(skill.color)} rounded-full transition-all duration-1000 group-hover:animate-pulse`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* About Section */}
      <section id="about" className="relative py-20 px-6 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Left: Education & Bio */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-500/20 rounded-2xl">
                  <Briefcase className="w-8 h-8 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-2">Cornell University</h3>
                  <p className="text-slate-400 text-lg">Class of 2027</p>
                  <p className="text-slate-400">CS Major • Game Design Minor</p>
                </div>
              </div>

              <div className="space-y-4 text-slate-300 leading-relaxed">
                <p>
                  Passionate about building interactive experiences that bridge creativity and technology. From developing games used by fellow Cornell students to creating Maya pipeline tools, I love tackling complex technical challenges and crafting elegant solutions.
                </p>
                <p>
                  Currently exploring the intersection of game development, technical art, and immersive systems design, with a focus on creating robust tools and beautiful interactive experiences.
                </p>
              </div>

              <div className="flex gap-4 mt-8">
                {[
                  { icon: Github, label: "GitHub", url: "https://github.com/dann1m"},
                  { icon: Linkedin, label: "LinkedIn", url: "https://www.linkedin.com/in/danielle-imogu-b7892928b/" },
                  { icon: Mail, label: "Email" , url: "mailto:dannieim689@gmail.com" }
                ].map((social, i) => (
                  <button
                    key={i}
                    onClick={() => window.open(social.url, "_blank")}
                    className="p-3 bg-purple-500/20 border border-purple-400/30 rounded-full hover:bg-purple-500/30 hover:border-cyan-400/50 transition-all duration-300 group"
                  >
                    <social.icon className="w-6 h-6 text-purple-300 group-hover:text-cyan-400 transition-colors" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Skills Grid */}
            <div>
              <h3 className="text-sm uppercase tracking-widest text-slate-400 mb-8">Languages</h3>
              <div className="grid grid-cols-3 gap-2 mb-12">
                {[
                  { name: "C#", color: "bg-purple-500", icon: <i class="devicon-csharp-plain text-2xl"></i> },
                  { name: "Python", color: "bg-blue-500", icon: <SiPython className="w-5 h-5 text-white" />},
                  { name: "C++", color: "bg-cyan-500", icon: <i class="devicon-cplusplus-plain text-2xl"></i> },
                  { name: "JavaScript", color: "bg-yellow-500", icon: <i class="devicon-javascript-plain text-2xl"></i> },
                  { name: "Java", color: "bg-orange-500", icon: <i class="devicon-java-plain text-2xl"></i> },
                  { name: "OCaml", color: "bg-green-500", icon: <i class="devicon-ocaml-plain text-2xl"></i> }
                ].map((lang, i) => (
                  <div
                    key={i}
                    className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-4 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105"
                  >
                    <div className={` flex items-center justify-center w-8 h-8 ${lang.color} rounded-lg mb-3`}>
                      {lang.icon}
                    </div>
                    <p className="text-slate-200 font-medium">{lang.name}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-sm uppercase tracking-widest text-slate-400 mb-8">Technologies</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { name: "Unity", color: "bg-slate-600", icon: <i class="devicon-unity-plain text-2xl"></i> },
                  { name: "Unreal", color: "bg-blue-600", icon: <i class="devicon-unrealengine-plain text-2xl"></i> },
                  { name: "Maya", color: "bg-teal-500", icon: <i class="devicon-maya-plain text-2xl"></i> },
                  { name: "Blender", color: "bg-orange-500", icon: <i class="devicon-blender-original text-2xl"></i> },
                  { name: "Git", color: "bg-orange-600", icon: <i class="devicon-github-original text-2xl"></i> },
                  { name: "Node.js", color: "bg-green-600", icon: <i class="devicon-nodejs-plain text-2xl"></i> },
                  { name: "React", color: "bg-cyan-500", icon: <i class="devicon-react-original text-2xl"></i> },
                  { name: "Three.js", color: "bg-slate-500", icon: <i class="devicon-threejs-original text-2xl"></i> }
                ].map((tech, i) => (
                  <div
                    key={i}
                    className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-4 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105"
                  >
                    {/* <div className={`w-8 h-8 ${tech.color} rounded-lg mb-3`} /> */}
                    <div className={` flex items-center justify-center w-8 h-8 ${tech.color} rounded-lg mb-3`}>
                      {tech.icon}
                    </div>
                    <p className="text-slate-200 font-medium">{tech.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      {/* <section id="about" className="relative py-20 px-6 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-purple-500/20 p-12">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="space-y-4 text-lg text-slate-300 leading-relaxed">
              <p>
                I'm a junior at Cornell studying Computer Science with a minor in Game Design. My work sits at the intersection of technical precision and creative expression.
              </p>
              <p>
                From building VR social spaces to developing Maya pipeline tools, I love creating systems that empower both developers and artists. My technical foundation in CS gives me the tools to solve complex problems, while my artistic background ensures those solutions are beautiful and human-centered.
              </p>
              <p>
                When I'm not coding or modeling, you'll find me sketching character designs, experimenting with procedural art, or playing indie games to see what makes them tick.
              </p>
            </div>

            <div className="flex gap-4 mt-8">
              {[
                { icon: Github, label: "GitHub" },
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Mail, label: "Email" }
              ].map((social, i) => (
                <button
                  key={i}
                  className="p-3 bg-purple-500/20 border border-purple-400/30 rounded-full hover:bg-purple-500/30 hover:border-cyan-400/50 transition-all duration-300 group"
                >
                  <social.icon className="w-6 h-6 text-purple-300 group-hover:text-cyan-400 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* Experience Section */}
      <section id="experience" className="relative py-20 px-6 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm uppercase tracking-widest text-slate-400 mb-4">Experience</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Experience 1 */}
            <div className="bg-slate-800/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 hover:border-cyan-400/30 transition-all duration-500">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center text-2xl">
                  💻
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">Course Consultant</h3>
                  <p className="text-slate-400">CS 1110: Introduction to Computing in Python</p>
                  <p className="text-sm text-slate-500 mt-1">AUG 2025 – PRESENT • Cornell University</p>
                </div>
              </div>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Provide problem-solving guidance and technical mentorship to students learning Python programming fundamentals.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Assist in debugging, algorithm design, and conceptual understanding during lab and office hours.</span>
                </li>
              </ul>
            </div>

            {/* Experience 2 */}
            <div className="bg-slate-800/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 hover:border-cyan-400/30 transition-all duration-500">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center text-2xl">
                  🧠
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">Human-Computer Interaction Research Intern</h3>
                  <p className="text-slate-400">BURE Program, Cornell CIS</p>
                  <p className="text-sm text-slate-500 mt-1">JUN 2025 – AUG 2025</p>
                </div>
              </div>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>Designed interaction techniques for mobile telepresence robots to improve remote expert consultation.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>Developed VR interfaces in Unity (C#) with supporting tools in Python and JavaScript for Oculus Quest testing.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>Received the Clare Boothe Luce Undergraduate Research Award (Summer 2025).</span>
                </li>
              </ul>
            </div>

            {/* Experience 3 */}
            <div className="bg-slate-800/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 hover:border-cyan-400/30 transition-all duration-500">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-lime-500 to-green-500 rounded-xl flex items-center justify-center text-2xl">
                  🧩
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">Undergraduate Research Assistant</h3>
                  <p className="text-slate-400">Cornell CIS Robotics Lab</p>
                  <p className="text-sm text-slate-500 mt-1">FEB 2024 – PRESENT</p>
                </div>
              </div>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-lime-400 mt-1">•</span>
                  <span>Develop VR applications for remote collaboration using Unity (C#) and Oculus Quest headsets.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lime-400 mt-1">•</span>
                  <span>Contributed to research on physical robots vs. virtual avatars in collaborative tasks (paper under CSCW 2026 review).</span>
                </li>
              </ul>
            </div>

            {/* Experience 4 */}
            <div className="bg-slate-800/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 hover:border-cyan-400/30 transition-all duration-500">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-2xl">
                  📋
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">Secretary</h3>
                  <p className="text-slate-400">Women in Computing at Cornell (WICC)</p>
                  <p className="text-sm text-slate-500 mt-1">AUG 2023 – PRESENT</p>
                </div>
              </div>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-orange-400 mt-1">•</span>
                  <span>Manage logistics for a 100+ member organization, including active member tracking and attendance systems.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-400 mt-1">•</span>
                  <span>Maintain alumni records and coordinate communication between members and executive board.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section id="contact" className="relative py-20 px-6 scroll-mt-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Let's Create Together
            </span>
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Looking for someone who can bridge the gap between art and engineering? Let's talk.
          </p>
          <button 
          onClick={() => window.open("https://www.linkedin.com/in/danielle-imogu-b7892928b/")}
          className="px-12 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105">
            Get In Touch
          </button>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="bg-slate-800 rounded-3xl border border-purple-500/30 max-w-3xl w-full p-8 relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 hover:bg-slate-700 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* <div className={`text-6xl mb-6`}>
              {selectedProject.image}</div> */}
            
            <h3 className="text-3xl font-bold mb-2">{selectedProject.title}</h3>
            <p className="text-cyan-400 mb-4">{selectedProject.category}</p>
            
            <p className="text-slate-300 text-lg mb-6 leading-relaxed">
              {selectedProject.description}
            </p>

            <div className="flex gap-2 flex-wrap mb-6">
              {selectedProject.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-purple-500/20 border border-purple-400/30 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-4">
              {selectedProject.buttons.map((btn, i) => (
                 <a
                  key={i}
                  href={btn.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-6 py-3 ${
                    i === 0
                      ? "bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold hover:shadow-lg transition-all"
                      : "border-2 border-purple-400 rounded-full font-semibold hover:bg-purple-400/10 transition-all"
                  }`}
                >
                  {btn.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
}