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
                    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                        {/* Total Fleet Size */}
                        <div className="bg-[var(--background)]/40 backdrop-blur-md border border-[var(--border)] p-5 md:p-6 rounded-[2rem] md:rounded-[2.5rem] shadow-inner flex items-center gap-4 md:gap-6">
                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary-500/10 flex items-center justify-center shrink-0">
                                <Users size={24} className="text-primary-500" />
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-[8px] md:text-[9px] font-black text-[var(--muted-foreground)] uppercase tracking-[0.2em]">{t('users.active_fleet_size')}</p>
                                <p className="text-2xl md:text-3xl font-black text-[var(--foreground)] italic leading-none">
                                    {usersData?.totalNumberOfRecords || 0}
                                    <span className="text-primary-500 text-xs ml-2 uppercase tracking-widest">{t('users.agents')}</span>
                                </p>
                            </div>
                        </div>

                        {/* Admin & User Breakdown */}
                        <div className="flex gap-3 md:gap-4">
                            <div className="flex-1 bg-[var(--background)]/40 backdrop-blur-md border border-[var(--border)] p-4 md:p-5 rounded-[1.5rem] md:rounded-[2rem] shadow-inner">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                        <ShieldAlert size={14} className="text-blue-500" />
                                    </div>
                                    <p className="text-[7px] md:text-[8px] font-black text-[var(--muted-foreground)] uppercase tracking-[0.2em]">{t('users.admins_label')}</p>
                                </div>
                                <p className="text-xl md:text-2xl font-black text-[var(--foreground)] italic leading-none">
                                    {usersData?.data?.filter(u => u.group.name === 'SystemUsers').length || 0}
                                </p>
                            </div>
                            <div className="flex-1 bg-[var(--background)]/40 backdrop-blur-md border border-[var(--border)] p-4 md:p-5 rounded-[1.5rem] md:rounded-[2rem] shadow-inner">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 rounded-xl bg-green-500/10 flex items-center justify-center">
                                        <Users size={14} className="text-green-500" />
                                    </div>
                                    <p className="text-[7px] md:text-[8px] font-black text-[var(--muted-foreground)] uppercase tracking-[0.2em]">{t('users.users_label')}</p>
                                </div>
                                <p className="text-xl md:text-2xl font-black text-[var(--foreground)] italic leading-none">
                                    {usersData?.data?.filter(u => u.group.name !== 'SystemUsers').length || 0}
                                </p>
                            </div>
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
