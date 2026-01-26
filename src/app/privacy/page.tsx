'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
    return (
        <div className="bg-slate-50 text-slate-900 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
            <main className="w-full max-w-2xl bg-white rounded-xl shadow-sm border p-6 sm:p-8">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    トップに戻る
                </Link>

                <h1 className="text-2xl font-bold tracking-tight mb-6">プライバシーポリシー</h1>

                <div className="prose prose-slate max-w-none space-y-6 text-sm leading-relaxed">
                    <section>
                        <h2 className="text-lg font-semibold mb-3">1. 基本方針</h2>
                        <p className="text-muted-foreground">
                            証明写真マスター（以下「本サービス」）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めます。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold mb-3">2. 画像データの取り扱い</h2>
                        <p className="text-muted-foreground">
                            本サービスでは、ユーザーが選択・撮影した画像データは<strong className="text-foreground">一切サーバーへ送信されません</strong>。
                            すべての画像処理（トリミング、証明写真シートの生成など）はユーザーのデバイス上（ブラウザ内）で完結します。
                            そのため、画像データが外部に漏洩するリスクはありません。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold mb-3">3. 収集する情報</h2>
                        <p className="text-muted-foreground">
                            本サービスでは、サービス改善を目的として、以下の匿名化された情報を収集する場合があります：
                        </p>
                        <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                            <li>アクセス日時</li>
                            <li>ブラウザの種類</li>
                            <li>参照元URL</li>
                            <li>ページビュー数</li>
                        </ul>
                        <p className="text-muted-foreground mt-2">
                            これらの情報には個人を特定できる情報は含まれません。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold mb-3">4. Cookieの使用</h2>
                        <p className="text-muted-foreground">
                            本サービスでは、ユーザー体験の向上やアクセス解析のためにCookieを使用する場合があります。
                            ブラウザの設定によりCookieを無効にすることも可能ですが、一部の機能が正常に動作しない場合があります。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold mb-3">5. 第三者への提供</h2>
                        <p className="text-muted-foreground">
                            本サービスは、ユーザーの情報を第三者に販売、貸与、またはその他の方法で提供することはありません。
                            ただし、法令に基づく場合を除きます。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold mb-3">6. 本ポリシーの変更</h2>
                        <p className="text-muted-foreground">
                            本ポリシーは、必要に応じて変更されることがあります。
                            変更後のポリシーは、本ページに掲載した時点で効力を生じるものとします。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold mb-3">7. お問い合わせ</h2>
                        <p className="text-muted-foreground">
                            本ポリシーに関するお問い合わせは、サービス運営者までご連絡ください。
                        </p>
                    </section>
                </div>

                <p className="text-xs text-muted-foreground mt-8 pt-4 border-t">
                    最終更新日: 2026年1月26日
                </p>
            </main>
        </div>
    );
}
