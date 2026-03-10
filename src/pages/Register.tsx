import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import heroBg from '@/assets/hero-bg.png';

const Register = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Tandai sesi sebagai pending agar tidak ter-logout otomatis saat proses transisi
            localStorage.setItem('simulasi_session_id', 'PENDING');

            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName
                    }
                }
            });
            if (error) throw error;

            // Perbarui last_session_id jika otomatis login saat pendaftaran
            if (data.session) {
                const sessionId = Math.random().toString(36).substring(2, 15);
                localStorage.setItem('simulasi_session_id', sessionId);

                await supabase
                    .from('profiles')
                    .update({ last_session_id: sessionId })
                    .eq('id', data.session.user.id);
            }

            toast.success('Registrasi berhasil!');
            navigate('/login');
        } catch (error: any) {
            toast.error(error.message || 'Gagal mendaftar');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center bg-[#0A0A0A] overflow-hidden">
            {/* Background Background with Blur/Darken */}
            <div className="absolute inset-0 z-0">
                <img
                    src={heroBg}
                    alt="Background"
                    className="w-full h-full object-cover opacity-30 grayscale brightness-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
            </div>

            <div className="relative z-10 max-w-md w-full px-6 pt-24 pb-12 md:pt-12 md:pb-12 animate-fade-up">
                <div className="bg-white/5 backdrop-blur-xl p-10 rounded-2xl border border-white/10 shadow-2xl shadow-black/50">
                    <div className="text-center mb-10">
                        <Link to="/" className="inline-flex items-center gap-2 mb-8 group text-gray-400 hover:text-white transition-colors">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-xs font-medium uppercase tracking-widest">Kembali</span>
                        </Link>
                        <h1 className="text-3xl font-bold text-white tracking-tight">Daftar Akun</h1>
                        <p className="text-gray-400 mt-3 text-sm font-light">Mulai akses infrastruktur kalkulasi pembiayaan terbaik.</p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500 ml-1">Nama Lengkap</label>
                            <Input
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Budi Santoso"
                                className="h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-white/20 transition-all rounded-lg"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500 ml-1">Email</label>
                            <Input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@company.com"
                                className="h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-white/20 transition-all rounded-lg"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold uppercase tracking-widest text-gray-500 ml-1">Password</label>
                            <Input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Minimal 6 karakter"
                                minLength={6}
                                className="h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-white/20 transition-all rounded-lg"
                            />
                        </div>
                        <Button type="submit" className="w-full h-12 bg-white text-black hover:bg-gray-100 font-bold uppercase tracking-widest text-xs transition-all rounded-lg" disabled={loading}>
                            {loading ? 'Memproses...' : 'Daftar Sekarang'}
                        </Button>
                    </form>

                    <div className="mt-10 text-center">
                        <p className="text-gray-500 text-sm font-light">
                            Sudah punya akun? <Link to="/login" className="text-white hover:underline font-medium">Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
