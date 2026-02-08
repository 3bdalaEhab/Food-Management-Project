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

    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
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
            {/* Background Data Matrix pattern - High Performance */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:40px_40px]" />

            <ModulePageLayout
                title={t('users.fleet_title')}
                titlePrefix={t('users.fleet_prefix')}
                description={t('users.fleet_desc')}
                subtitle={t('users.fleet_command')}
                badgeLabel={t('users.tactical_control')}
                HeaderIcon={Users}
                /* primaryAction removed as per user request */
                secondaryNode={
                    <div className="flex flex-wrap items-center gap-4 lg:gap-8 w-full sm:w-auto">
                        {/* Total Fleet Size - standardized */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-[var(--sidebar-background)]/60 backdrop-blur-md border border-[var(--border)] p-4 md:p-5 rounded-[1.5rem] md:rounded-[2rem] shadow-xl flex items-center gap-4 md:gap-6 hover:border-primary-500/30 transition-all duration-500 group overflow-hidden relative min-w-full sm:min-w-[240px]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary-500 flex items-center justify-center shrink-0 shadow-lg shadow-primary-500/20 relative z-10 group-hover:scale-110 transition-transform">
                                <Users size={24} className="text-white md:w-7 md:h-7" />
                            </div>
                            <div className="space-y-1 relative z-10">
                                <div className="flex items-center gap-2">
                                    <div className="w-1 h-1 rounded-full bg-primary-500 animate-pulse" />
                                    <p className="text-[8px] font-black text-[var(--muted-foreground)] opacity-50 uppercase tracking-[0.4em] rtl:tracking-normal italic rtl:not-italic leading-none">{t('users.total_fleet')}</p>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <p className="text-3xl md:text-4xl font-black text-[var(--foreground)] tracking-tighter rtl:tracking-normal leading-none italic rtl:not-italic uppercase tabular-nums">
                                        {usersData?.totalNumberOfRecords || 0}
                                    </p>
                                    <span className="text-[10px] font-black text-primary-500 uppercase tracking-widest rtl:tracking-normal opacity-40 rtl:not-italic">{t('users.node_units')}</span>
                                </div>
                            </div>
                        </motion.div>

                        <div className="flex gap-4 w-full sm:w-auto">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 }}
                                className="bg-[var(--sidebar-background)]/60 backdrop-blur-md border border-[var(--border)] p-4 md:p-5 rounded-[1.5rem] md:rounded-[2rem] shadow-xl flex flex-col justify-between w-full sm:w-36 hover:border-green-500/30 transition-all duration-500 group h-28 md:h-auto"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-green-500/10 flex items-center justify-center group-hover:bg-green-500 transition-all">
                                        <Users size={16} className="text-green-500 group-hover:text-white transition-colors md:w-[18px] md:h-[18px]" />
                                    </div>
                                    <span className="text-[8px] font-black text-green-500/50 uppercase tracking-widest rtl:tracking-normal italic rtl:not-italic">{t('common.active')}</span>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xl md:text-2xl font-black text-[var(--foreground)] tracking-tighter rtl:tracking-normal italic rtl:not-italic leading-none tabular-nums">
                                        {usersData?.data?.length || 0}
                                    </p>
                                    <div className="h-1 w-full bg-green-500/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500 w-[60%] animate-pulse" />
                                    </div>
                                </div>
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
                            <h3 className="text-4xl font-black text-[var(--foreground)] tracking-tighter rtl:tracking-normal leading-none uppercase italic rtl:not-italic">{t('users.fleet_disconnected')}</h3>
                            <p className="text-[var(--muted-foreground)] font-bold uppercase tracking-[0.2em] rtl:tracking-normal text-[11px] opacity-60 max-w-sm mx-auto rtl:not-italic">{t('users.awaiting_sync')}</p>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="premium-button premium-button-primary h-16 px-10 group mt-10"
                        >
                            <span className="font-black uppercase tracking-widest rtl:tracking-normal text-sm rtl:not-italic">{t('users.initialize_sync')}</span>
                            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-500 rtl:rotate-180 rtl:group-hover:-translate-x-2" />
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
