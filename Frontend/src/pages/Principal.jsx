import React, {useState} from "react";
import { Routes, Route, Link} from "react-router-dom";
import { PiHouseBold, PiUserFill} from "react-icons/pi";
import { MdSettings, MdMenu, MdClose} from "react-icons/md";
import TelaLed from "./TelaLed";
import BoiaStatus from "./BoiaStatus"
import DHT from "./DHT";
import SensorSolo from "./SensorSolo";
export default function Principal() {
    const [menuAberto, setMenuAberto] = useState(false);
    return (
        <div className="flex h-screen font-sans">
            {/* Sidebar Responsivo */}
            <section className={`fixed z-30 inset-y-0 left-0 transform w-64 bg-gray-900 text-white p-4 transition-transform duration-300
                ease-in-out md:relative md:translate-x-0
                ${menuAberto ? "translate-x-0" : "-translate-x-full"}`}>
                
                <div className="flex items-center justify-between mb-6">
                    <span className="text-xl font-bold">Menu</span>
                    <button className="md:hidden" onClick={() => setMenuAberto(false)}><MdClose className="w-5 h-5"/></button> 
                </div>

                <nav className="space-y-4">
                    <Link to="/telaled" onClick={() => setMenuAberto(false)} className="flex items-center gap-4 p-2 rounded hover:bg-gray-700">
                    <PiHouseBold /> <span>Tela Led</span>
                    </Link>
                    <Link to="/BoiaStatus" onClick={() => setMenuAberto(false)} className="flex items-center gap-4 p-2 rounded hover:bg-gray-700">
                    <PiHouseBold /> <span>Status Boia</span>
                    </Link>
                    <Link to="/DHT" onClick={() => setMenuAberto(false)} className="flex items-center gap-4 p-2 rounded hover:bg-gray-700">
                    <PiHouseBold /> <span>Sensor DHT</span>
                    </Link>
                    <Link to="/sensorSolo" onClick={() => setMenuAberto(false)} className="flex items-center gap-4 p-2 rounded hover:bg-gray-700">
                    <PiHouseBold /> <span>Sensor Solo</span>
                    </Link>      
                </nav>
            </section>

            {/* Conteúdo Principal */}
            <section className="flex-1 p-6 bg-gray-100 text-black w-full overflow-auto">
                <header>
                    <button className="text-gray-900 md:hidden"
                    onClick={() => setMenuAberto(true)}>
                        <MdMenu className="w-6 h-6"/>
                    </button>
                </header>
                <main>
                    <Routes>
                        <Route path="/telaled" element={<TelaLed />} />
                        <Route path="/BoiaStatus" element={<BoiaStatus />} />
                        <Route path="/DHT" element={<DHT />} />
                        <Route path="/sensorSolo" element={<SensorSolo />} />
                    </Routes>
                </main>
            </section>

        </div>
    )
}