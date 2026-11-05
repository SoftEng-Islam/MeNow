<script lang="ts" setup>
import { Eye, EyeOff, Loader2 } from "lucide-vue-next";
import logo from "~/assets/images/menow-logo.svg";
definePageMeta({
	layout: "auth",
});

const loginInput = ref({
	email: "",
	password: "",
	remember: false,
});

const showPassword = ref(false);
const loading = ref(false);
const errors = ref<{ email?: string; password?: string; form?: string }>({});

function validate() {
	const e: typeof errors.value = {};
	if (!loginInput.value.email) e.email = "Enter your email address.";
	else if (!/^\S+@\S+\.\S+$/.test(loginInput.value.email))
		e.email = "That email doesn’t look right. Check for typos.";
	if (!loginInput.value.password) e.password = "Enter your password.";
	else if (loginInput.value.password.length < 8)
		e.password = "Passwords have at least 8 characters.";
	errors.value = e;
	return Object.keys(e).length === 0;
}

async function onSubmit() {
	if (!validate()) return;
	loading.value = true;
	try {
		// TODO: replace with your real endpoint
		await $fetch("/api/auth/login", {
			method: "POST",
			body: loginInput.value,
		});
		await navigateTo("/");
	} catch {
		errors.value = { form: "Wrong email or password. Try again." };
	} finally {
		loading.value = false;
	}
}
</script>

<template>
	<div
		class="auth-layout grid min-h-screen bg-background text-foreground lg:grid-cols-2"
	>
		<!-- Brand panel (desktop only) -->
		<aside
			class="relative hidden flex-col justify-between overflow-hidden bg-primary p-12 text-primary-foreground lg:flex"
		>
			<div
				class="pointer-events-none absolute inset-0 opacity-[0.08]"
				style="
					background-image:
						linear-gradient(currentColor 1px, transparent 1px),
						linear-gradient(
							90deg,
							currentColor 1px,
							transparent 1px
						);
					background-size: 48px 48px;
				"
				aria-hidden="true"
			/>

			<NuxtLink
				to="/"
				class="relative flex items-center gap-2 text-lg font-semibold tracking-tight"
			>
				<img :src="logo" alt="MeNow" class="h-20 w-auto" />
			</NuxtLink>

			<figure class="relative max-w-md space-y-4">
				<blockquote
					class="text-3xl font-semibold leading-tight tracking-tight"
				>
					Write it down once. Find it every time you need it.
				</blockquote>
				<figcaption class="text-sm text-primary-foreground/70">
					Notes, guides and build logs, all in one place.
				</figcaption>
			</figure>

			<p class="relative text-xs text-primary-foreground/60">
				© {{ new Date().getFullYear() }} MeNow
			</p>
		</aside>

		<!-- Form panel -->
		<main class="flex items-center justify-center px-6 py-12 sm:px-12">
			<div class="w-full max-w-sm space-y-8">
				<header class="space-y-2">
					<h1 class="text-2xl font-semibold tracking-tight">
						Log in to your account
					</h1>
					<p class="text-sm text-muted-foreground">
						New here?
						<NuxtLink
							to="/auth/signup"
							class="font-medium text-foreground underline-offset-4 hover:underline"
						>
							Create an account
						</NuxtLink>
					</p>
				</header>

				<!-- Social -->
				<div class="grid grid-cols-2 gap-3">
					<Button variant="outline" type="button" class="gap-2">
						<svg
							viewBox="0 0 24 24"
							class="size-4"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"
							/>
						</svg>
						GitHub
					</Button>
					<Button variant="outline" type="button" class="gap-2">
						<svg
							viewBox="0 0 24 24"
							class="size-4"
							aria-hidden="true"
						>
							<path
								fill="#4285F4"
								d="M23.5 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.45a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.57-5.17 3.57-8.81Z"
							/>
							<path
								fill="#34A853"
								d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.88-3c-1.07.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.1A12 12 0 0 0 12 24Z"
							/>
							<path
								fill="#FBBC05"
								d="M5.27 14.28a7.2 7.2 0 0 1 0-4.56v-3.1H1.27a12 12 0 0 0 0 10.76l4-3.1Z"
							/>
							<path
								fill="#EA4335"
								d="M12 4.77c1.76 0 3.35.61 4.6 1.8l3.43-3.43C17.95 1.19 15.23 0 12 0A12 12 0 0 0 1.27 6.62l4 3.1C6.22 6.88 8.87 4.77 12 4.77Z"
							/>
						</svg>
						Google
					</Button>
				</div>

				<div
					class="flex items-center gap-3 text-xs text-muted-foreground"
				>
					<span class="h-px flex-1 bg-border" />
					or use your email
					<span class="h-px flex-1 bg-border" />
				</div>

				<!-- Form -->
				<form class="space-y-5" novalidate @submit.prevent="onSubmit">
					<p
						v-if="errors.form"
						role="alert"
						class="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
					>
						{{ errors.form }}
					</p>

					<div class="space-y-2">
						<Label for="email">Email</Label>
						<Input
							id="email"
							v-model="loginInput.email"
							type="email"
							autocomplete="email"
							placeholder="you@example.com"
							:aria-invalid="!!errors.email"
							:aria-describedby="
								errors.email ? 'email-error' : undefined
							"
							:class="
								errors.email &&
								'border-destructive focus-visible:ring-destructive'
							"
						/>
						<p
							v-if="errors.email"
							id="email-error"
							class="text-sm text-destructive"
						>
							{{ errors.email }}
						</p>
					</div>

					<div class="space-y-2">
						<div class="flex items-center justify-between">
							<Label for="password">Password</Label>
							<NuxtLink
								to="/auth/forgot-password"
								class="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
							>
								Forgot password?
							</NuxtLink>
						</div>
						<div class="relative">
							<Input
								id="password"
								v-model="loginInput.password"
								:type="showPassword ? 'text' : 'password'"
								autocomplete="current-password"
								class="pr-10"
								:aria-invalid="!!errors.password"
								:aria-describedby="
									errors.password
										? 'password-error'
										: undefined
								"
								:class="
									errors.password &&
									'border-destructive focus-visible:ring-destructive'
								"
							/>
							<button
								type="button"
								class="absolute inset-y-0 right-0 grid w-10 place-items-center rounded-r-md text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
								:aria-label="
									showPassword
										? 'Hide password'
										: 'Show password'
								"
								:aria-pressed="showPassword"
								@click="showPassword = !showPassword"
							>
								<EyeOff v-if="showPassword" class="size-4" />
								<Eye v-else class="size-4" />
							</button>
						</div>
						<p
							v-if="errors.password"
							id="password-error"
							class="text-sm text-destructive"
						>
							{{ errors.password }}
						</p>
					</div>

					<div class="flex items-center gap-2">
						<Checkbox id="remember" v-model="loginInput.remember" />
						<Label
							for="remember"
							class="cursor-pointer font-normal"
						>
							Keep me logged in on this device
						</Label>
					</div>

					<Button type="submit" class="w-full" :disabled="loading">
						<Loader2
							v-if="loading"
							class="mr-2 size-4 animate-spin"
						/>
						{{ loading ? "Logging in…" : "Log in" }}
					</Button>
				</form>

				<p class="text-center text-xs text-muted-foreground">
					By logging in, you agree to the
					<NuxtLink
						to="/terms"
						class="underline underline-offset-4 hover:text-foreground"
					>
						Terms
					</NuxtLink>
					and
					<NuxtLink
						to="/privacy"
						class="underline underline-offset-4 hover:text-foreground"
					>
						Privacy Policy</NuxtLink
					>.
				</p>
			</div>
		</main>
	</div>
</template>
