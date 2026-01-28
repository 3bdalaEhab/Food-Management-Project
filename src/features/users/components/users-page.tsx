import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Users,
    Search,
    Mail,
    Phone,
    Globe,
    ShieldCheck,
    UserX,
    Sparkles,
    ChevronRight,
    ChefHat
} from "lucide-react";

import { useUsers, useDeleteUser } from "../hooks";
import { Skeleton } from "@/components/ui";

export function UsersPage() {
    const [search, setSearch] = useState("");
    const { data: usersData, isLoading } = useUsers({
        userName: search,
        pageSize: 10,
        pageNumber: 1
    });

    const { mutate: deleteUser } = useDeleteUser();

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariant = {
        hidden: { opacity: 0, x: -20 },
        show: { opacity: 1, x: 0 }
    };

    return (
        <div className="space-y-10 pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 text-primary-600 font-black uppercase tracking-[0.2em] text-[11px]"
                    >
                        <Sparkles size={14} />
                        Collaborator Management
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-black text-neutral-900 tracking-tight leading-none">
                        Project <span className="text-primary-500">Users</span>
                    </h1>
                </div>

                <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-neutral-100 shadow-sm">
                    <div className="px-4 py-2 bg-neutral-50 rounded-xl">
                        <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Total Active</p>
                        <p className="text-xl font-black text-neutral-900">{usersData?.totalNumberOfRecords || 0}</p>
                    </div>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-500 transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Search collaborators by name or role..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="premium-input pl-12 h-14 bg-white shadow-sm border-neutral-200/60"
                    />
                </div>
            </div>

            {/* Users List */}
            {isLoading ? (
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="glass-card rounded-[2rem] p-6 flex items-center gap-6">
                            <Skeleton className="w-16 h-16 rounded-2xl" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-6 w-1/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : usersData?.data?.length ? (
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="space-y-4"
                >
                    <AnimatePresence mode="popLayout">
                        {usersData.data.map((user) => (
                            <motion.div
                                key={user.id}
                                variants={itemVariant}
                                layout
                                className="group glass-card rounded-[2.5rem] p-6 hover:shadow-2xl transition-all duration-500 border-white/40 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="relative">
                                        <div className="w-16 h-16 rounded-[1.5rem] bg-neutral-100 overflow-hidden flex items-center justify-center border-2 border-white shadow-lg">
                                            {user.imagePath ? (
                                                <img src={user.imagePath} alt={user.userName} className="w-full h-full object-cover" />
                                            ) : (
                                                <ChefHat className="text-neutral-300" size={32} />
                                            )}
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg bg-primary-500 flex items-center justify-center text-white shadow-lg ring-2 ring-white">
                                            <ShieldCheck size={14} />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <h3 className="text-xl font-black text-neutral-900 tracking-tight group-hover:text-primary-600 transition-colors">
                                            {user.userName}
                                        </h3>
                                        <div className="flex flex-wrap items-center gap-4 text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
                                            <span className="flex items-center gap-1.5 bg-neutral-100 px-2.5 py-1 rounded-lg text-neutral-600">
                                                <Users size={12} />
                                                {user.group.name}
                                            </span>
                                            <span className="hidden sm:flex items-center gap-1.5">
                                                <Mail size={12} />
                                                {user.email}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex items-center gap-6 lg:gap-10">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Region</p>
                                        <div className="flex items-center gap-2 text-neutral-700 font-bold">
                                            <Globe size={14} className="text-primary-500" />
                                            {user.country}
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Contact</p>
                                        <div className="flex items-center gap-2 text-neutral-700 font-bold">
                                            <Phone size={14} className="text-primary-500" />
                                            {user.phoneNumber}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 ml-auto lg:ml-0">
                                        <button
                                            onClick={() => deleteUser(user.id)}
                                            className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-400 hover:bg-red-50 hover:text-red-500 transition-all shadow-sm group/btn"
                                        >
                                            <UserX size={20} className="group-hover/btn:scale-110 transition-transform" />
                                        </button>
                                        <div className="w-12 h-12 rounded-2xl bg-neutral-50 flex items-center justify-center text-neutral-300">
                                            <ChevronRight size={20} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            ) : (
                <div className="flex flex-col items-center justify-center py-32 glass-card rounded-[3rem] border-dashed border-2 border-white/40 text-center px-6">
                    <div className="w-24 h-24 bg-neutral-100 rounded-[2.5rem] flex items-center justify-center mb-6 text-neutral-400">
                        <UserX size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-neutral-900 mb-2 tracking-tight">No Users Found</h3>
                    <p className="text-neutral-500 font-bold mb-8 max-w-sm">It seems your culinary project is currently private. Start inviting collaborators.</p>
                </div>
            )}
        </div>
    );
}
