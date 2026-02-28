import { Instagram, Twitter, Linkedin, Facebook, ArrowUpRight, Cloud, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white pt-1 pb-2 px-1 md:px-2">
        <div className="w-[98%] max-w-[1800px] mx-auto bg-black rounded-[2.5rem] p-6 md:p-10 overflow-hidden relative">
            
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="w-full h-full object-cover opacity-60"
                >
                    <source src="https://cjlpsqzjtchvpckpyllb.supabase.co/storage/v1/object/public/sentia/DJI_0815%20(1).mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Upper Content */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 md:mb-12 relative z-10 text-white">
                {/* Brand Description */}
                <div className="md:col-span-1">
                    <h3 className="text-lg md:text-xl font-medium mb-6 leading-snug text-white">
                        Sentia is the ultimate<br /> 
                        convergence of tech,<br />
                        culture, and art.
                    </h3>
                </div>

                {/* Explore Links */}
                <div className="md:pl-8">
                    <h4 className="text-white/60 mb-4 text-xs font-medium uppercase tracking-wide">Explore</h4>
                    <ul className="space-y-3 font-medium text-base text-white">
                        <li><a href="#" className="hover:text-blue-400 transition-colors block">Events</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors block">Schedule</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors block">Sponsors</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors block">Contact</a></li>
                    </ul>
                </div>

                {/* Socials */}
                <div>
                    <h4 className="text-white/60 mb-4 text-xs font-medium uppercase tracking-wide">Follow us</h4>
                    <ul className="space-y-3 text-white text-base">
                        <li>
                            <a target='_blank' href="https://www.instagram.com/sentia.mite/?hl=en" className="flex items-center gap-3 hover:text-blue-400 transition-colors font-medium">
                                <div className="p-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white"><Instagram className="w-3.5 h-3.5" /></div> 
                                <span>Instagram</span>
                            </a>
                        </li>
                         <li>
                            <a target='_blank' href="https://www.linkedin.com/company/miteedu/" className="flex items-center gap-3 hover:text-blue-400 transition-colors font-medium">
                                <div className="p-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white"><Linkedin className="w-3.5 h-3.5" /></div> 
                                <span>LinkedIn</span>
                            </a>
                        </li>
                    </ul>
                </div>

                {/* CTA */}
                <div>
                    <a href="#" className="group block mb-6">
                        <div className="flex items-center gap-3 text-xl font-medium mb-1 text-orange-500">
                             Register Now 
                             <div className="bg-orange-500 text-white p-1 rounded-full group-hover:rotate-45 transition-transform">
                                <ArrowUpRight className="w-4 h-4" />
                             </div>
                        </div>
                        <p className="text-white/60 text-xs">Join the excitement</p>
                    </a>
                </div>
            </div>

            {/* Massive Typography */}
            <div className="relative w-full flex justify-center border-b border-white/10 pb-2 z-10">
                <h1 className="text-[14vw] leading-[0.8] font-black tracking-tighter text-white select-none pointer-events-none">
                    SENTIA 2026
                </h1>
            </div>

             {/* Bottom Bar */}
             <div className="relative z-10 flex flex-col md:flex-row justify-between items-center mt-4 text-xs font-medium text-white/50">
                <p>Sentia © {new Date().getFullYear()}</p>
                <div className="flex items-center gap-6 mt-3 md:mt-0">
                    <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>MITE, Moodabidri</span>
                    </div>
                </div>
             </div>

        </div>
    </footer>
  )
}
