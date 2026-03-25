'use client';
import{memo,ReactNode,useState,ChangeEvent,FormEvent,useEffect,useRef,forwardRef}from'react';
import Image from'next/image';
import{motion,useAnimation,useInView,useMotionTemplate,useMotionValue}from'motion/react';
import{Eye,EyeOff}from'lucide-react';
import{cn}from'@/lib/utils';

const AnimatedInput=memo(forwardRef(function A({className,type,...props}:React.InputHTMLAttributes<HTMLInputElement>,ref:React.ForwardedRef<HTMLInputElement>){
const r=100;const[v,sv]=useState(false);const mx=useMotionValue(0);const my=useMotionValue(0);
function hm({currentTarget,clientX,clientY}:React.MouseEvent<HTMLDivElement>){const{left,top}=currentTarget.getBoundingClientRect();mx.set(clientX-left);my.set(clientY-top)}
return(<motion.div style={{background:useMotionTemplate`radial-gradient(${v?r+'px':'0px'} circle at ${mx}px ${my}px,#5570c8,transparent 80%)`}} onMouseMove={hm} onMouseEnter={()=>sv(true)} onMouseLeave={()=>sv(false)} className='group/input rounded-lg p-[2px] transition duration-300'><input type={type} className={cn('shadow-input flex h-10 w-full rounded-md border-none bg-surface-100 px-3 py-2 text-sm text-ink-900 transition duration-400 group-hover/input:shadow-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-ink-400 focus-visible:ring-[2px] focus-visible:ring-brand-300 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',className)} ref={ref}{...props}/></motion.div>)
}));AnimatedInput.displayName='AnimatedInput';

type BRP={children:ReactNode;width?:string;boxColor?:string;duration?:number;overflow?:string;position?:string;className?:string};
const BoxReveal=memo(function B({children,width='fit-content',boxColor,duration,overflow='hidden',position='relative',className}:BRP){
const mc=useAnimation();const sc=useAnimation();const ref=useRef(null);const iv=useInView(ref,{once:true});
useEffect(()=>{if(iv){sc.start('visible');mc.start('visible')}else{sc.start('hidden');mc.start('hidden')}},[iv,mc,sc]);
return(<section ref={ref} style={{position:position as any,width,overflow}} className={className}><motion.div variants={{hidden:{opacity:0,y:75},visible:{opacity:1,y:0}}} initial='hidden' animate={mc} transition={{duration:duration??0.5,delay:0.25}}>{children}</motion.div><motion.div variants={{hidden:{left:0},visible:{left:'100%'}}} initial='hidden' animate={sc} transition={{duration:duration??0.5,ease:'easeIn'}} style={{position:'absolute',top:4,bottom:4,left:0,right:0,zIndex:20,background:boxColor??'#3a56b0',borderRadius:8}}/></section>)});

type RP={mainCircleSize?:number;mainCircleOpacity?:number;numCircles?:number;className?:string};
const Ripple=memo(function R({mainCircleSize=210,mainCircleOpacity=0.24,numCircles=11,className=''}:RP){
return(<section className={`max-w-[50%] absolute inset-0 flex items-center justify-center bg-surface-50 [mask-image:linear-gradient(to_bottom,black,transparent)] ${className}`}>{Array.from({length:numCircles},(_,i)=>(<span key={i} className='absolute animate-ripple rounded-full bg-brand-500/10 border' style={{width:`${mainCircleSize+i*70}px`,height:`${mainCircleSize+i*70}px`,opacity:mainCircleOpacity-i*0.03,animationDelay:`${i*0.06}s`,borderStyle:i===numCircles-1?'dashed':'solid',borderWidth:'1px',borderColor:`rgba(79,109,245,${0.08+i*0.01})`,top:'50%',left:'50%',transform:'translate(-50%,-50%)'}}/>))}</section>)});

type OCP={className?:string;children:ReactNode;reverse?:boolean;duration?:number;delay?:number;radius?:number;path?:boolean};
const OrbitingCircles=memo(function O({className,children,reverse=false,duration=20,delay=10,radius=50,path=true}:OCP){
return(<>{path&&<svg xmlns='http://www.w3.org/2000/svg' version='1.1' className='pointer-events-none absolute inset-0 size-full'><circle className='stroke-brand-200 stroke-1' cx='50%' cy='50%' r={radius} fill='none'/></svg>}<section style={{'--duration':duration,'--radius':radius,'--delay':-delay}as React.CSSProperties} className={cn('absolute flex size-full transform-gpu animate-orbit items-center justify-center rounded-full border border-surface-200 bg-white/60 [animation-delay:calc(var(--delay)*1000ms)]',{'[animation-direction:reverse]':reverse},className)}>{children}</section></>)});

type IC={className?:string;duration?:number;delay?:number;radius?:number;path?:boolean;reverse?:boolean;component:()=>React.ReactNode};
type TDP={iconsArray:IC[];text?:string};
const TechOrbitDisplay=memo(function T({iconsArray,text='Animated Login'}:TDP){
return(<section className='relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg'><span className='pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-brand-500 to-brand-300 bg-clip-text text-center text-7xl font-semibold leading-none text-transparent'>{text}</span>{iconsArray.map((ic,i)=>(<OrbitingCircles key={i} className={ic.className} duration={ic.duration} delay={ic.delay} radius={ic.radius} path={ic.path} reverse={ic.reverse}>{ic.component()}</OrbitingCircles>))}</section>)});

type FT='text'|'email'|'password';
type F={label:string;required?:boolean;type:FT;placeholder?:string;onChange:(e:ChangeEvent<HTMLInputElement>)=>void};
type AFP={header:string;subHeader?:string;fields:F[];submitButton:string;textVariantButton?:string;errorField?:string;fieldPerRow?:number;onSubmit:(e:FormEvent<HTMLFormElement>)=>void;googleLogin?:string;goTo?:(e:React.MouseEvent<HTMLButtonElement>)=>void};
type E={[k:string]:string};

const AnimatedForm=memo(function AF({header,subHeader,fields,submitButton,textVariantButton,errorField,fieldPerRow=1,onSubmit,googleLogin,goTo}:AFP){
const[vis,setVis]=useState(false);const[errors,setErrors]=useState<E>({});
const tv=()=>setVis(!vis);
const vf=(ev:FormEvent<HTMLFormElement>)=>{const e:E={};fields.forEach(f=>{const v=(ev.target as HTMLFormElement)[f.label]?.value;if(f.required&&!v)e[f.label]=`${f.label} is required`;if(f.type==='email'&&v&&!/\S+@\S+\.\S+/.test(v))e[f.label]='Invalid email';if(f.type==='password'&&v&&v.length<6)e[f.label]='Min 6 characters'});return e};
const hs=(ev:FormEvent<HTMLFormElement>)=>{ev.preventDefault();const fe=vf(ev);if(!Object.keys(fe).length)onSubmit(ev);else setErrors(fe)};
return(<section className='max-md:w-full flex flex-col gap-4 w-96 mx-auto'>
<BoxReveal boxColor='var(--skeleton)' duration={0.3}><h2 className='font-bold text-3xl text-ink-900'>{header}</h2></BoxReveal>
{subHeader&&<BoxReveal boxColor='var(--skeleton)' duration={0.3} className='pb-2'><p className='text-ink-500 text-sm max-w-sm'>{subHeader}</p></BoxReveal>}
{googleLogin&&<><BoxReveal boxColor='var(--skeleton)' duration={0.3} overflow='visible' width='unset'><button className='g-button group/btn bg-transparent w-full rounded-xl border h-10 font-medium outline-hidden hover:cursor-pointer text-ink-600 hover:text-ink-800 transition-colors' type='button'><span className='flex items-center justify-center w-full h-full gap-3'><Image src='https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png' width={26} height={26} alt='Google'/>{googleLogin}</span><BottomGradient/></button></BoxReveal><BoxReveal boxColor='var(--skeleton)' duration={0.3} width='100%'><section className='flex items-center gap-4'><hr className='flex-1 border-1 border-dashed border-surface-200'/><p className='text-ink-400 text-sm'>or</p><hr className='flex-1 border-1 border-dashed border-surface-200'/></section></BoxReveal></>}
<form onSubmit={hs}><section className={`grid grid-cols-1 md:grid-cols-${fieldPerRow} mb-4`}>{fields.map(f=>(<section key={f.label} className='flex flex-col gap-2'><BoxReveal boxColor='var(--skeleton)' duration={0.3}><Label htmlFor={f.label}>{f.label} <span className='text-rose-500'>*</span></Label></BoxReveal><BoxReveal width='100%' boxColor='var(--skeleton)' duration={0.3} className='flex flex-col space-y-2 w-full'><section className='relative'><AnimatedInput type={f.type==='password'?(vis?'text':'password'):f.type} id={f.label} placeholder={f.placeholder} onChange={f.onChange}/>{f.type==='password'&&<button type='button' onClick={tv} className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-ink-400'>{vis?<Eye className='h-5 w-5'/>:<EyeOff className='h-5 w-5'/>}</button>}</section><section className='h-4'>{errors[f.label]&&<p className='text-rose-500 text-xs'>{errors[f.label]}</p>}</section></BoxReveal></section>))}</section>
<BoxReveal width='100%' boxColor='var(--skeleton)' duration={0.3}>{errorField&&<p className='text-rose-500 text-sm mb-4'>{errorField}</p>}</BoxReveal>
<BoxReveal width='100%' boxColor='var(--skeleton)' duration={0.3} overflow='visible'><button className='bg-brand-500 relative group/btn block w-full text-white rounded-xl h-10 font-medium shadow-soft hover:bg-brand-600 transition-colors outline-hidden hover:cursor-pointer' type='submit'>{submitButton} &rarr;<BottomGradient/></button></BoxReveal>
{textVariantButton&&goTo&&<BoxReveal boxColor='var(--skeleton)' duration={0.3}><section className='mt-4 text-center'><button className='text-sm text-brand-500 hover:text-brand-600 outline-hidden transition-colors' onClick={goTo}>{textVariantButton}</button></section></BoxReveal>}
</form></section>)});

const BottomGradient=()=>(<><span className='group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-brand-400 to-transparent'/><span className='group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-brand-500 to-transparent'/></>);

interface ATP{formFields:{header:string;subHeader?:string;fields:Array<{label:string;required?:boolean;type:string;placeholder:string;onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void}>;submitButton:string;textVariantButton?:string};goTo:(e:React.MouseEvent<HTMLButtonElement>)=>void;handleSubmit:(e:React.FormEvent<HTMLFormElement>)=>void}
const AuthTabs=memo(function AT({formFields,goTo,handleSubmit}:ATP){return(<div className='flex max-lg:justify-center w-full md:w-auto'><div className='w-full lg:w-1/2 h-[100dvh] flex flex-col justify-center items-center max-lg:px-[10%]'><AnimatedForm{...formFields} fieldPerRow={1} onSubmit={handleSubmit} goTo={goTo} googleLogin='Login with Google'/></div></div>)});

interface LP extends React.LabelHTMLAttributes<HTMLLabelElement>{htmlFor?:string}
const Label=memo(function L({className,...props}:LP){return<label className={cn('text-sm font-medium leading-none text-ink-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70',className)}{...props}/>});

export{AnimatedInput,BoxReveal,Ripple,OrbitingCircles,TechOrbitDisplay,AnimatedForm,AuthTabs,Label,BottomGradient};
