'use client'
import MainHeader from "../components/MainHeader";
import { authContext } from "../context/AuthContext";
import dynamic from 'next/dynamic';
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import type { Container, Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";

const NoSSRForceGraph = dynamic(() =>  import('../utils/NoSSRGraphQL'), {ssr: false});

const myData = {
  "nodes": [
    {
        "id" : "0",
        "title" : "",
        "size" : 100
    },
    {
        "id" : "1",
        "title" : "Art Generator",
        "size" : 100,
        "x" : -30, 
        "y" : -40, 
    },
    {
        "id" : "2",
        "title" : "Speech Synthesizer",
        "size" : 80,
        "x" : 10, 
        "y" : 30, 
    },
    {
        "id" : "3",
        "title" : "Birds only!",
        "size" : 80,
        "x" : 50, 
        "y" : -40, 
    },
    {
        "id" : "4",
        "title" : "Generative AI",
        "size" : 90,
        "x" : 30, 
        "y" : -100, 
    },
  ],
  "links": [
    {
        "source": "0",
        "target": "1",
        "value": "Art Images"
    },
    {
        "source": "0",
        "target": "2",
        "value": "Speech Synthesizer"
    },
    {
        "source": "0",
        "target": "3",
        "value": "Bird Images"
    },
    {
        "source": "0",
        "target": "4",
        "value": "Generative AI"
    },
    {
        "source": "1",
        "target": "4",
        "value": "Generative AI"
    },
    {
        "source": "3",
        "target": "4",
        "value": "Generative AI"
    },
    {
        "source": "2",
        "target": "3",
        "value": "Generative AI"
    },
    {
        "source": "4",
        "target": "3",
        "value": "Generative AI"
    },
    {
        "source": "1",
        "target": "2",
        "value": "Generative AI"
    },
    {
        "source": "3",
        "target": "2",
        "value": "Generative AI"
    },
    {
        "source": "2",
        "target": "1",
        "value": "Generative AI"
    },
  ]
}

function Home() {
    const router = useRouter();
    const welcomeText ='Hello and welcome';

    const particlesInit = useCallback(async (engine: Engine) => {
        // console.log(engine);
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async (container: Container | undefined) => {
        // console.log(container);
    }, []);

    function drawHexagon(x: number, y: number, ctx: any) {
        ctx.beginPath();
        const shapeType = 6;
        const angle = 2 * Math.PI / shapeType;
        let radius = 25;
        ctx.fillStyle = "red";
        ctx.lineWidth = 2;
        for (let i = 0; i < shapeType; i++) {
            let xx = x + radius * Math.cos(angle * i);
            let yy = y + radius * Math.sin(angle * i);
            ctx.lineTo(xx, yy);
        }
        ctx.closePath();
        ctx.stroke();
        // ctx.fill();
        
        // Dotted hexagon draw
        const gradient = createGradient(ctx);
         ctx.strokeStyle = gradient;
         radius = 30;
         ctx.beginPath();
         for (let i = 0; i < shapeType; i++) {
            let xx = x + radius * Math.cos(angle * i);
            let yy = y + radius * Math.sin(angle * i);
            ctx.lineTo(xx, yy);
        }
        //  ctx.arc(x, y, 40, 0, Math.PI * 2);
         ctx.closePath();
         ctx.stroke();
        
         // inner hexagon
         radius = 20;
         ctx.beginPath();
         for (let i = 0; i < shapeType; i++) {
            let xx = x + radius * Math.cos(angle * i);
            let yy = y + radius * Math.sin(angle * i);
            ctx.lineTo(xx, yy);
        }
        //  ctx.arc(x, y, 40, 0, Math.PI * 2);
         ctx.closePath();
         ctx.stroke();
         ctx.fillStyle = "black";
         ctx.fill();
    }

    function createRainbowEffect(ctx: any) {
        var gr = ctx.createLinearGradient(0, 0, 500, 0);              
        gr.addColorStop(0, "hsl(" + ((Math.random() * 360) % 360) + ",100%, 50%)");   
        gr.addColorStop(1, "hsl(" + ((Math.random() * 360) % 360) + ",100%, 50%)");  
        ctx.fillStyle = gr;                                            
        return gr;
    }

    function createGradient(ctx: any) {
        // Create gradient
        const gradient = ctx.createLinearGradient(10, 20, 40, 0);
        gradient.addColorStop(0, "orange");
        gradient.addColorStop(0.01, "magenta");
        gradient.addColorStop(0.3, "yellow");
        gradient.addColorStop(0.5, "blue");
        gradient.addColorStop(0.8, "black");
        gradient.addColorStop(1.0, "red");

        return gradient;
    }

    function drawStar(cx: number,cy: number,spikes: number,outerRadius: number,innerRadius: number, ctx: any) {
        var rot=Math.PI/2*3;
        var x=cx;
        var y=cy;
        var step=Math.PI/spikes;

        ctx.beginPath();
        ctx.moveTo(cx,cy-outerRadius)
        for(let i=0; i<spikes; i++){
        x=cx+Math.cos(rot)*outerRadius;
        y=cy+Math.sin(rot)*outerRadius;
        ctx.lineTo(x,y);
        rot+=step;

        x=cx+Math.cos(rot)*innerRadius;
        y=cy+Math.sin(rot)*innerRadius;
        ctx.lineTo(x,y);
        rot+=step;
        }
        ctx.lineTo(cx,cy-outerRadius);
        ctx.closePath();
        ctx.lineWidth = 3;
        ctx.strokeStyle='white';
        ctx.stroke();

        let rainbowEffect = createRainbowEffect(ctx);
        ctx.fillStyle = rainbowEffect;
        ctx.fill();
    }
   
    return (
    <>
        <MainHeader/>
        <div className="flex flex-col items-center bg-[#75b2ce] bg-no-repeat bg-center bg-cover place-items-center bg-[url('/abstract-technology-ai-computing.svg')] justify-start h-screen w-screen overflow-y-auto overflow-x-hidden p-3 text-white">
            <div className="overflow-hidden">
                <Particles
                    id="tsparticles"
                    init={particlesInit}
                    loaded={particlesLoaded}
                    options={{
                        background: {
                            color: {
                                value: "#0d47a1",
                            },
                        },
                        fpsLimit: 120,
                        interactivity: {
                            events: {
                                onClick: {
                                    enable: true,
                                    mode: "push",
                                },
                                onHover: {
                                    enable: true,
                                    mode: "repulse",
                                },
                                resize: true,
                            },
                            modes: {
                                push: {
                                    quantity: 4,
                                },
                                repulse: {
                                    distance: 200,
                                    duration: 0.4,
                                },
                            },
                        },
                        particles: {
                            color: {
                                value: "#ffffff",
                            },
                            links: {
                                color: "#ffffff",
                                distance: 150,
                                enable: true,
                                opacity: 0.5,
                                width: 1,
                            },
                            collisions: {
                                enable: true,
                            },
                            move: {
                                direction: "none",
                                enable: true,
                                outModes: {
                                    default: "bounce",
                                },
                                random: false,
                                speed: 2,
                                straight: false,
                            },
                            number: {
                                density: {
                                    enable: true,
                                    area: 800,
                                },
                                value: 80,
                            },
                            opacity: {
                                value: 0.5,
                            },
                            shape: {
                                type: "circle",
                            },
                            size: {
                                value: { min: 1, max: 5 },
                            },
                        },
                        detectRetina: true,
                    }}
                />
                <NoSSRForceGraph 
                    nodeId="id"
                    nodeLabel={"title"}
                    graphData={myData} 
                    // linkVisibility={false}
                    onNodeClick={(node, event) => {
                        if (node.id == 1) {
                            router.push('/generateimage')
                        }
                        if (node.id == 2) {
                            router.push('/texttospeech')
                        }
                        if (node.id == 3) {
                            router.push('/generatebirdimage')
                        }
                        if (node.id == 4) {
                            router.push('/generativeai')
                        }
                    }}
                    nodeCanvasObject={(node, ctx, globalScale) => {
                        const label = node['title'] as string;
                        const fontSize = 14 / globalScale;
                        ctx.font = `Bold  ${fontSize}px Arial`;
                        
                        if (node.id == 1 || node.id == 2 || node.id == 3 || node.id == 4) {
                            if (node.id == 1) {
                                drawStar(node?.x!, node?.y!, 5, 30, 15, ctx);
                                ctx.setLineDash([5, 5]);

                                // Dotted circle draw
                                ctx.beginPath();
                                ctx.arc(node?.x!, node?.y!, 40, 0, Math.PI * 2);
                                ctx.closePath();
                                ctx.stroke();
                            } else if (node.id == 3) {
                                drawHexagon(node?.x!, node?.y!, ctx);
                            } else if (node.id == 4) {
                                ctx.beginPath();
                                ctx.arc(node?.x!, node?.y!, 30, 0, Math.PI * 2, true);
                                ctx.moveTo(node?.x! + 10, node?.y! );
                                ctx.arc(node?.x!, node?.y!, 20, 0, Math.PI*2, false);
                                ctx.arc(node?.x!, node?.y!, 30, 0, Math.PI, false); 
                                ctx.strokeStyle='black';
                                ctx.stroke();
                                ctx.fillStyle = "aquamarine";
                                ctx.fill();

                            } else {
                                const gradient = createGradient(ctx);
                                // Fill with gradient
                                ctx.fillStyle = gradient;
                                ctx.beginPath();
                                ctx.arc(node?.x!, node?.y!, 25, 0, 2 * Math.PI);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.arc(node?.x!, node?.y!, 16, 0, 2 * Math.PI);
                                ctx.stroke();
                                ctx.fill();
                                
                                // Draw ellipse
                                ctx.lineWidth = 0.8;
                                ctx.strokeStyle='blue';
                                ctx.beginPath();
                                ctx.ellipse(node?.x!, node?.y!, 32, 65, Math.PI / 2, 0, 2 * Math.PI);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.ellipse(node?.x!, node?.y!, 32, 65, Math.PI / 4, 0, 2 * Math.PI);
                                ctx.stroke();
                                ctx.lineWidth = 1.5;
                                ctx.strokeStyle='black';
                            }
                        }
              
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillStyle = 'white';
                        ctx.fillText(label, node?.x!, node?.y!);
                    }}
                    nodeVal={"size"}
                    d3AlphaDecay={0}
                    // nodeRelSize={3}
                    d3AlphaMin={10}
                />
            </div>
            <h3 className="text-white justify-between items-center text-center p-3 opacity-80">{welcomeText} <span className="font-semibold hover:underline hover:text-[#11A37F] hover:opacity-100">{authContext?.currentUser?.displayName || authContext?.currentUser?.email}</span>!</h3>
        </div>
    </>
  )
};

export default Home;