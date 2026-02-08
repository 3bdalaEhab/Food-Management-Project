import { useState } from "react";
import {
    Users,
    Plus,
    ShieldAlert,
    ArrowRight,
} from "lucide-react";
import { useUsers, useDeleteUser } from "../hooks";
import { DeleteConfirmation } from "@/components/shared/delete-confirmation";
import { UserCard } from "./user-card";
import { UserForm } from "./user-form";
import { CustomDialog } from "@/components/shared/custom-dialog";
import { useTranslation } from "react-i18next";
import { useDebounce } from "@/hooks/use-debounce";
import { ModulePageLayout } from "@/components/shared/module-page-layout";
import { motion } from "framer-motion";

export function UsersPage() {
    const { t } = useTranslation();
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 500);

    const [viewMode, setViewMode] = useState<"grid" | "list">("list");
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [isAddUserOpen, setIsAddUserOpen] = useState(false);

    const { data: usersData, isLoading } = useUsers({
        userName: debouncedSearch,
        pageSize: 100, // Show all users at once
        pageNumber: 1
    });

    const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();

    const isEmpty = !isLoading && (!usersData?.data || usersData.data.length === 0);

    return (
        <>
            {/* Background Matrix Mesh */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0">
                <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-[var(--background)]" />
            </div>

            <ModulePageLayout
                title={t('users.fleet_title')}
                titlePrefix={t('users.fleet_prefix')}
                description={t('users.fleet_desc')}
                subtitle={t('users.fleet_command')}
                badgeLabel={t('users.tactical_control')}
                HeaderIcon={Users}
                primaryAction={{
                    label: t('users.add_new_agent'),
                    onClick: () => setIsAddUserOpen(true),
                    icon: Plus
                }}
                secondaryNode={
                    <div className="flex flex-wrap gap-4 lg:gap-8">
                        {/* Total Fleet Size */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="relative group cursor-pointer"
                        >
                            {/* Plasma Glow */}
                            <div className="absolute -inset-4 bg-primary-500/20 blur-[3rem] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-150" />
                            <div className="absolute inset-0 bg-primary-500/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-150" />

                            <div className="relative bg-[var(--sidebar-background)]/80 backdrop-blur-md border border-[var(--border)] p-6 md:p-8 rounded-[3rem] shadow-2xl transition-[border-color,box-shadow] duration-150 hover:border-primary-500/30 flex items-center gap-6 overflow-hidden transform-gpu will-change-transform">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/[0.03] rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-300" />
                                <div className="w-16 h-16 rounded-[1.8rem] bg-primary-500 shadow-[0_8px_25px_rgba(255,107,38,0.3)] flex items-center justify-center shrink-0 relative z-10 group-hover:scale-105 transition-transform duration-150">
                                    <Users size={32} className="text-white" />
                                </div>
                                <div className="space-y-1.5 relative z-10">
                                    <p className="text-[10px] font-black text-primary-500 uppercase tracking-[0.4em] italic opacity-70">{t('users.active_fleet_size')}</p>
                                    <div className="flex items-baseline gap-2">
                                        <p className="text-4xl md:text-5xl font-black text-[var(--foreground)] tracking-tighter leading-none italic uppercase">
                                            {usersData?.totalNumberOfRecords || 0}
                                        </p>
                                        <span className="text-[11px] font-black text-[var(--muted-foreground)] uppercase tracking-widest opacity-30">{t('users.agents')}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Admins & Users Breakdown */}
                        <div className="flex gap-4">

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.15, delay: 0.05 }}
                                className="bg-[var(--sidebar-background)]/80 backdrop-blur-md border border-[var(--border)] p-6 rounded-[2.5rem] shadow-xl flex flex-col justify-between w-32 md:w-36 hover:border-green-500/30 transition-[border-color,transform] duration-150 cursor-pointer transform-gpu will-change-transform group"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-green-500 group-hover:text-white transition-[background-color,color,transform] duration-150">
                                        <Users size={18} className="text-green-500 group-hover:text-white transition-colors duration-150" />
                                    </div>
                                    <span className="text-[8px] font-black text-green-500 uppercase tracking-widest opacity-60 italic">{t('users.users_label')}</span>
                                </div>
                                <p className="text-3xl font-black text-[var(--foreground)] tracking-tighter italic leading-none">
                                    {usersData?.data?.filter(u => u.group.name !== 'SystemUsers').length || 0}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                }
                searchQuery={search}
                onSearchChange={setSearch}
                searchPlaceholder={t('users.scan_collaborators') || t('users.search')}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                isLoading={isLoading}
                isEmpty={isEmpty}
                emptyState={
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-40 glass-card rounded-[4rem] border-dashed border-2 border-primary-500/20 bg-primary-500/[0.02] text-center px-6"
                    >
                        <div className="w-32 h-32 bg-[var(--sidebar-background)] rounded-[3rem] shadow-2xl border border-[var(--border)] flex items-center justify-center mb-8 group overflow-hidden relative">
                            {/* Scanning Light */}
                            <motion.div
                                animate={{ top: ["-100%", "100%"] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="absolute left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-primary-500/20 to-transparent z-0"
                            />
                            <div className="absolute inset-0 bg-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <ShieldAlert size={48} className="text-primary-500/40 group-hover:text-white relative z-10" />
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-4xl font-black text-[var(--foreground)] tracking-tighter leading-none uppercase italic">{t('users.fleet_disconnected')}</h3>
                            <p className="text-[var(--muted-foreground)] font-bold uppercase tracking-[0.2em] text-[11px] opacity-60 max-w-sm mx-auto">{t('users.awaiting_sync')}</p>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="premium-button premium-button-primary h-16 px-10 group mt-10"
                        >
                            <span className="font-black uppercase tracking-widest text-sm">{t('users.initialize_sync')}</span>
                            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-500" />
                        </motion.button>
                    </motion.div>
                }
            >
                {usersData?.data?.map((user) => (
                    <UserCard
                        key={user.id}
                        user={user}
                        onDelete={setDeleteId}
                        viewMode={viewMode}
                    />
                ))}
            </ModulePageLayout>

            <DeleteConfirmation
                isOpen={deleteId !== null}
                onClose={() => setDeleteId(null)}
                onConfirm={() => {
                    if (deleteId) {
                        deleteUser(deleteId, {
                            onSuccess: () => setDeleteId(null)
                        });
                    }
                }}
                isDeleting={isDeleting}
                itemName={`${t('users.agent_node')}_${deleteId}`}
            />

            <CustomDialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen} maxWidth="2xl">
                <UserForm
                    onSuccess={() => setIsAddUserOpen(false)}
                    onCancel={() => setIsAddUserOpen(false)}
                />
            </CustomDialog>
        </>
    );
}
