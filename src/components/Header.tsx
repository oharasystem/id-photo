import Link from 'next/link';
import Image from 'next/image';

export function Header() {
    return (
        <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
                <Link
                    href="/"
                    className="flex items-center gap-2 py-3 hover:opacity-80 transition-opacity"
                >
                    <Image
                        src="/logo.png"
                        alt="証明写真マスター"
                        width={32}
                        height={32}
                        className="rounded-md"
                    />
                    <span className="text-lg font-bold text-slate-900">
                        証明写真マスター
                    </span>
                </Link>
            </div>
        </header>
    );
}
