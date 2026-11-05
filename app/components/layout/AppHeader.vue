<script setup lang="ts">
import {
	SearchIcon,
	ShoppingCartIcon,
	PackageIcon,
	UserIcon,
	SunIcon,
	MoonIcon,
	LogOutIcon,
	SettingsIcon,
	HeartIcon,
	ChevronDownIcon,
} from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");
function toggleTheme() {
	colorMode.preference = isDark.value ? "light" : "dark";
}
const searchQuery = ref("");
const cartCount = ref(3);
const ordersCount = ref(1);
</script>

<template>
	<header
		class="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md"
	>
		<div
			class="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6"
		>
			<NuxtLink
				to="/"
				class="flex shrink-0 items-center gap-2 select-none"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					class="h-8 w-8 fill-primary"
					aria-hidden="true"
				>
					<ellipse cx="5.5" cy="6.5" rx="2" ry="2.5" />
					<ellipse cx="9" cy="4" rx="2" ry="2.5" />
					<ellipse cx="13" cy="4" rx="2" ry="2.5" />
					<ellipse cx="16.5" cy="6.5" rx="2" ry="2.5" />
					<path
						d="M12 8.5c-4 0-7 2.5-6 7 .5 2 2 3.5 4 3.5h4c2 0 3.5-1.5 4-3.5 1-4.5-2-7-6-7Z"
					/>
				</svg>
				<span
					class="hidden font-bold text-xl tracking-tight text-foreground sm:inline"
				>
					Me<span class="text-primary">Now</span>
				</span>
			</NuxtLink>

			<div
				class="relative mx-4 hidden flex-1 max-w-sm md:flex lg:max-w-md"
			>
				<SearchIcon
					class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
				/>
				<Input
					v-model="searchQuery"
					type="search"
					placeholder="Search products..."
					class="h-9 w-full rounded-full pl-9 pr-4 text-sm"
				/>
			</div>

			<div class="ml-auto flex items-center gap-1">
				<Button
					variant="ghost"
					size="icon"
					class="md:hidden"
					aria-label="Search"
				>
					<SearchIcon class="h-5 w-5" />
				</Button>

				<Button
					variant="ghost"
					size="icon"
					aria-label="Toggle theme"
					@click="toggleTheme"
				>
					<Transition name="theme-icon" mode="out-in">
						<SunIcon v-if="isDark" class="h-5 w-5" />
						<MoonIcon v-else class="h-5 w-5" />
					</Transition>
				</Button>

				<Button
					variant="ghost"
					size="icon"
					class="relative"
					aria-label="My orders"
					as-child
				>
					<NuxtLink to="/orders">
						<PackageIcon class="h-5 w-5" />
						<Badge
							v-if="ordersCount > 0"
							class="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full p-0 text-[10px]"
						>
							{{ ordersCount }}
						</Badge>
					</NuxtLink>
				</Button>

				<Button
					variant="ghost"
					size="icon"
					class="relative"
					aria-label="Shopping cart"
					as-child
				>
					<NuxtLink to="/cart">
						<ShoppingCartIcon class="h-5 w-5" />
						<Badge
							v-if="cartCount > 0"
							class="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full p-0 text-[10px]"
						>
							{{ cartCount }}
						</Badge>
					</NuxtLink>
				</Button>

				<DropdownMenu>
					<DropdownMenuTrigger as-child>
						<Button
							variant="ghost"
							class="gap-2 rounded-full pl-2 pr-3 text-sm font-medium"
							aria-label="User menu"
						>
							<Avatar class="h-7 w-7">
								<AvatarImage src="" alt="User avatar" />
								<AvatarFallback class="text-xs"
									>JD</AvatarFallback
								>
							</Avatar>
							<span class="hidden sm:inline">John</span>
							<ChevronDownIcon
								class="h-4 w-4 text-muted-foreground"
							/>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" class="w-52">
						<DropdownMenuLabel>
							<p class="font-medium">John Doe</p>
							<p
								class="text-xs font-normal text-muted-foreground"
							>
								john@example.com
							</p>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem as-child>
							<NuxtLink
								to="/profile"
								class="flex cursor-pointer items-center gap-2"
							>
								<UserIcon class="h-4 w-4" /> My Profile
							</NuxtLink>
						</DropdownMenuItem>
						<DropdownMenuItem as-child>
							<NuxtLink
								to="/orders"
								class="flex cursor-pointer items-center gap-2"
							>
								<PackageIcon class="h-4 w-4" /> My Orders
							</NuxtLink>
						</DropdownMenuItem>
						<DropdownMenuItem as-child>
							<NuxtLink
								to="/wishlist"
								class="flex cursor-pointer items-center gap-2"
							>
								<HeartIcon class="h-4 w-4" /> Wishlist
							</NuxtLink>
						</DropdownMenuItem>
						<DropdownMenuItem as-child>
							<NuxtLink
								to="/settings"
								class="flex cursor-pointer items-center gap-2"
							>
								<SettingsIcon class="h-4 w-4" /> Settings
							</NuxtLink>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							class="flex cursor-pointer items-center gap-2 text-destructive focus:text-destructive"
						>
							<LogOutIcon class="h-4 w-4" /> Sign out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>

		<div class="border-t border-border px-4 py-2 md:hidden">
			<div class="relative">
				<SearchIcon
					class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
				/>
				<Input
					v-model="searchQuery"
					type="search"
					placeholder="Search products..."
					class="h-9 w-full rounded-full pl-9 pr-4 text-sm"
				/>
			</div>
		</div>
	</header>
</template>

<style scoped>
.theme-icon-enter-active,
.theme-icon-leave-active {
	transition:
		opacity 0.15s ease,
		transform 0.15s ease;
}
.theme-icon-enter-from {
	opacity: 0;
	transform: rotate(-30deg) scale(0.7);
}
.theme-icon-leave-to {
	opacity: 0;
	transform: rotate(30deg) scale(0.7);
}
</style>
