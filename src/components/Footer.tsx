import Link from 'next/link';

export function Footer() {
    return (
        <footer className="w-full mt-auto pt-8 pb-6 border-t border-slate-200 bg-slate-100">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-slate-600">
                        &copy; {new Date().getFullYear()} 証明写真マスター
                    </p>
                    <nav className="flex items-center gap-4 text-sm">
                        <Link
                            href="/"
                            className="text-slate-600 hover:text-slate-900 transition-colors"
                        >
                            ホーム
                        </Link>
                        <span className="text-slate-300">|</span>
                        <Link
                            href="/privacy"
                            className="text-slate-600 hover:text-slate-900 transition-colors"
                        >
                            プライバシーポリシー
                        </Link>
                    </nav>
                </div>
            </div>
        </footer>
    );
}
