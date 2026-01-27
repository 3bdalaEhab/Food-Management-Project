import { motion } from "framer-motion";
import {
    UtensilsCrossed,
    FolderOpen,
    Users,
    Heart,
    TrendingUp,
    Plus,
    ArrowRight,
    Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from "@/components/ui";
import { useAuthStore, selectIsAdmin } from "@/stores";

// Stat card component
function StatCard({
    icon: Icon,
    label,
    value,
    trend,
    color,
    delay,
}: {
    icon: React.ElementType;
    label: string;
    value: string;
    trend?: string;
    color: string;
    delay: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
        >
            <Card variant="elevated" hover="lift" className="overflow-hidden">
                <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                                {label}
                            </p>
                            <p className="text-3xl font-bold text-neutral-900 dark:text-white">
                                {value}
                            </p>
                            {trend && (
                                <div className="flex items-center gap-1 text-green-500">
                                    <TrendingUp className="w-4 h-4" />
                                    <span className="text-sm font-medium">{trend}</span>
                                </div>
                            )}
                        </div>
                        <div
                            className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center shadow-lg`}
                        >
                            <Icon className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

export function DashboardPage() {
    const user = useAuthStore((state) => state.user);
    const isAdmin = useAuthStore(selectIsAdmin);

    const stats = [
        {
            icon: UtensilsCrossed,
            label: "Total Recipes",
            value: "156",
            trend: "+12%",
            color: "bg-gradient-to-br from-primary-500 to-primary-600",
        },
        {
            icon: FolderOpen,
            label: "Categories",
            value: "24",
            trend: "+3%",
            color: "bg-gradient-to-br from-blue-500 to-blue-600",
        },
        {
            icon: Users,
            label: "Users",
            value: "1,234",
            trend: "+18%",
            color: "bg-gradient-to-br from-purple-500 to-purple-600",
        },
        {
            icon: Heart,
            label: "Favorites",
            value: "89",
            trend: "+5%",
            color: "bg-gradient-to-br from-red-500 to-red-600",
        },
    ];

    return (
        <div className="space-y-8">
            {/* Welcome Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-500 to-primary-600 p-8 text-white shadow-xl shadow-primary-500/30"
            >
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-5 h-5 text-yellow-300" />
                        <Badge variant="warning" className="bg-yellow-400/20 text-yellow-100 border-0">
                            {isAdmin ? "Admin" : "User"}
                        </Badge>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">
                        Welcome back, {user?.userName || "Chef"} 👋
                    </h1>
                    <p className="text-primary-100 max-w-xl">
                        Manage your recipes, categories, and explore new culinary adventures.
                        Your kitchen, your rules!
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                        {isAdmin && (
                            <Link to="/dashboard/recipes/new">
                                <Button
                                    variant="secondary"
                                    className="bg-white text-primary-600 hover:bg-primary-50"
                                    leftIcon={<Plus className="w-4 h-4" />}
                                >
                                    Add New Recipe
                                </Button>
                            </Link>
                        )}
                        <Link to="/dashboard/recipes">
                            <Button
                                variant="ghost"
                                className="text-white border border-white/30 hover:bg-white/10"
                                rightIcon={<ArrowRight className="w-4 h-4" />}
                            >
                                View All Recipes
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/10" />
                <div className="absolute -right-5 bottom-0 w-32 h-32 rounded-full bg-white/5" />
                <div className="absolute right-20 top-10 text-6xl opacity-20">🍕</div>
                <div className="absolute right-40 bottom-5 text-4xl opacity-20">🍔</div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <StatCard key={stat.label} {...stat} delay={index * 0.1} />
                ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <Card variant="default" padding="none">
                        <CardHeader className="p-6 pb-4">
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-0">
                            <div className="grid grid-cols-2 gap-3">
                                <Link to="/dashboard/recipes">
                                    <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4">
                                        <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                                            <UtensilsCrossed className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                                        </div>
                                        <div className="text-left">
                                            <p className="font-medium">Recipes</p>
                                            <p className="text-xs text-neutral-500">View all</p>
                                        </div>
                                    </Button>
                                </Link>

                                <Link to="/dashboard/favorites">
                                    <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4">
                                        <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                                            <Heart className="w-5 h-5 text-red-600 dark:text-red-400" />
                                        </div>
                                        <div className="text-left">
                                            <p className="font-medium">Favorites</p>
                                            <p className="text-xs text-neutral-500">Your picks</p>
                                        </div>
                                    </Button>
                                </Link>

                                {isAdmin && (
                                    <>
                                        <Link to="/dashboard/categories">
                                            <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4">
                                                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                                    <FolderOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                                </div>
                                                <div className="text-left">
                                                    <p className="font-medium">Categories</p>
                                                    <p className="text-xs text-neutral-500">Organize</p>
                                                </div>
                                            </Button>
                                        </Link>

                                        <Link to="/dashboard/users">
                                            <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4">
                                                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                                    <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                                </div>
                                                <div className="text-left">
                                                    <p className="font-medium">Users</p>
                                                    <p className="text-xs text-neutral-500">Manage</p>
                                                </div>
                                            </Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <Card variant="gradient" padding="none" className="h-full">
                        <CardHeader className="p-6 pb-4">
                            <CardTitle>Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-0">
                            <div className="space-y-4">
                                {[
                                    { action: "New recipe added", item: "Pasta Carbonara", time: "2 min ago" },
                                    { action: "Category updated", item: "Italian Cuisine", time: "1 hour ago" },
                                    { action: "User registered", item: "john@example.com", time: "3 hours ago" },
                                    { action: "Recipe favorited", item: "Chicken Tikka", time: "5 hours ago" },
                                ].map((activity, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between py-2 border-b border-neutral-200/50 dark:border-neutral-700/50 last:border-0"
                                    >
                                        <div>
                                            <p className="text-sm font-medium text-neutral-900 dark:text-white">
                                                {activity.action}
                                            </p>
                                            <p className="text-xs text-neutral-500">{activity.item}</p>
                                        </div>
                                        <span className="text-xs text-neutral-400">{activity.time}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
