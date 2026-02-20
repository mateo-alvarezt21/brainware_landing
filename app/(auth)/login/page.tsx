'use client';

import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function LoginPage() {
  const [errorMessage, dispatch, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <div className="flex items-center justify-center md:h-screen min-h-[600px] pt-20">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-24 w-full flex-col items-center justify-center gap-2 rounded-lg bg-zinc-900 p-3 md:h-36 border border-white/10">
          <div className="relative h-10 w-40">
            <Image
              src="/brainware-logo.png"
              alt="Brainware Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-lg font-light text-white/50">Admin</span>
        </div>

        <form action={dispatch} className="space-y-3">
          <div className="flex-1 rounded-lg bg-zinc-900 px-6 pb-4 pt-8 border border-white/10">
            <h1 className="mb-3 text-2xl font-bold text-white">
              Iniciar sesión
            </h1>
            <div className="w-full">
              <div>
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-zinc-400"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md border border-white/10 bg-zinc-800 py-[9px] pl-3 text-sm outline-2 placeholder:text-zinc-500 text-white"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Ingresa tu email"
                    required
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-zinc-400"
                  htmlFor="password"
                >
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md border border-white/10 bg-zinc-800 py-[9px] pl-3 text-sm outline-2 placeholder:text-zinc-500 text-white"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Ingresa tu contraseña"
                    required
                    minLength={6}
                  />
                </div>
              </div>
            </div>
            <Button className="mt-4 w-full" aria-disabled={isPending}>
              Ingresar
            </Button>
            <div
              className="flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              {errorMessage && (
                <p className="text-sm text-red-500">{errorMessage}</p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
