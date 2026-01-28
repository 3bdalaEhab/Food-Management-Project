import { useState } from "react";
import { motion } from "framer-motion";
import {
    Mail,
    Phone,
    Globe,
    Camera,
    Lock,
    Sparkles,
    BadgeCheck,
    ChefHat,
    Loader2
} from "lucide-react";

import { useAuthStore } from "@/stores";
import { ChangePasswordForm } from "./change-password-form";
import { Dialog, Button } from "@/components/ui";

export function ProfilePage() {
    const { user } = useAuthStore();
    const [isChangePassOpen, setIsChangePassOpen] = useState(false);

    const container = {
        hidden: { opacity: 0, y: 30 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariant = {
        hidden: { opacity: 0, x: -20 },
        show: { opacity: 1, x: 0 }
    };

    if (!user) return (
        <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-primary-500" size={40} />
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto space-y-10 pb-20">
            {/* Header */}
            <div className="space-y-2">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-primary-600 font-black uppercase tracking-[0.2em] text-[11px]"
                >
                    <Sparkles size={14} />
                    Account Hub
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-black text-neutral-900 tracking-tight leading-none">
                    Culinary <span className="text-primary-500">Identity</span>
                </h1>
            </div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 lg:grid-cols-3 gap-10"
            >
                {/* Profile Card */}
                <div className="lg:col-span-1">
                    <div className="glass-card rounded-[3.5rem] p-10 border border-white/40 shadow-2xl relative overflow-hidden text-center space-y-8">
                        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-primary-500/10 to-primary-600/5" />

                        <div className="relative pt-4">
                            <div className="w-32 h-32 mx-auto rounded-[2.5rem] bg-white shadow-2xl p-1 relative group cursor-pointer">
                                <div className="w-full h-full rounded-[2.25rem] bg-neutral-100 overflow-hidden flex items-center justify-center">
                                    {user.imagePath ? (
                                        <img src={user.imagePath} alt={user.userName} className="w-full h-full object-cover" />
                                    ) : (
                                        <ChefHat className="text-neutral-300" size={48} />
                                    )}
                                </div>
                                <div className="absolute inset-1 rounded-[2.25rem] bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Camera className="text-white" size={24} />
                                </div>
                            </div>

                            <div className="mt-6 space-y-1">
                                <div className="flex items-center justify-center gap-2">
                                    <h2 className="text-2xl font-black text-neutral-900 tracking-tight">{user.userName}</h2>
                                    <BadgeCheck className="text-primary-500" size={20} />
                                </div>
                                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">{user.role}</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Button
                                className="w-full premium-button premium-button-primary h-14"
                                onClick={() => { }}
                            >
                                <Camera size={18} />
                                <span>Change Photo</span>
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full h-14 rounded-2xl font-black border-2 border-neutral-100 text-neutral-600 hover:bg-neutral-50"
                                onClick={() => setIsChangePassOpen(true)}
                            >
                                <Lock size={18} />
                                <span>Update Security</span>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Details Hub */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="glass-card rounded-[3rem] p-10 md:p-14 border border-white/40 shadow-2xl space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {/* Email */}
                            <motion.div variants={itemVariant} className="space-y-2">
                                <label className="text-[11px] font-black text-neutral-500 uppercase tracking-[0.1em] ml-1">Email Address</label>
                                <div className="flex items-center gap-4 bg-neutral-50 h-16 px-6 rounded-2xl border border-neutral-100">
                                    <Mail className="text-primary-500" size={20} />
                                    <span className="font-bold text-neutral-800">{user.email}</span>
                                </div>
                            </motion.div>

                            {/* Phone */}
                            <motion.div variants={itemVariant} className="space-y-2">
                                <label className="text-[11px] font-black text-neutral-500 uppercase tracking-[0.1em] ml-1">Phone Records</label>
                                <div className="flex items-center gap-4 bg-neutral-50 h-16 px-6 rounded-2xl border border-neutral-100">
                                    <Phone className="text-primary-500" size={20} />
                                    <span className="font-bold text-neutral-800">{user.phoneNumber || "Not recorded"}</span>
                                </div>
                            </motion.div>

                            {/* Region */}
                            <motion.div variants={itemVariant} className="space-y-2">
                                <label className="text-[11px] font-black text-neutral-500 uppercase tracking-[0.1em] ml-1">Culinary Region</label>
                                <div className="flex items-center gap-4 bg-neutral-50 h-16 px-6 rounded-2xl border border-neutral-100">
                                    <Globe className="text-primary-500" size={20} />
                                    <span className="font-bold text-neutral-800">{user.country || "Not specified"}</span>
                                </div>
                            </motion.div>

                            {/* Verification */}
                            <motion.div variants={itemVariant} className="space-y-2">
                                <label className="text-[11px] font-black text-neutral-500 uppercase tracking-[0.1em] ml-1">System Status</label>
                                <div className="flex items-center gap-4 bg-primary-50 h-16 px-6 rounded-2xl border border-primary-100">
                                    <BadgeCheck className="text-primary-600" size={20} />
                                    <span className="font-bold text-primary-900">Verified Professional</span>
                                </div>
                            </motion.div>
                        </div>

                        <div className="pt-8 border-t border-neutral-100 flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Master Profile</p>
                                <p className="text-sm font-bold text-neutral-600">These details are visible to other culinary project members.</p>
                            </div>
                            <Button
                                className="premium-button h-14 px-10"
                            >
                                Edit Portfolio
                            </Button>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Change Password Modal */}
            <Dialog
                open={isChangePassOpen}
                onOpenChange={setIsChangePassOpen}
            >
                <ChangePasswordForm
                    onSuccess={() => setIsChangePassOpen(false)}
                    onCancel={() => setIsChangePassOpen(false)}
                />
            </Dialog>
        </div>
    );
}
