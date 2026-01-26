import React from 'react';
import { Camera, Crop, Printer, Smartphone, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function LandingContent() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-12 py-12 animate-in fade-in duration-700">

      {/* 使い方セクション */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-center text-slate-800">
          3ステップで簡単作成
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center space-y-3 p-4 bg-white rounded-lg border shadow-sm">
            <div className="p-3 bg-blue-50 rounded-full text-blue-600">
              <Camera className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg">1. 撮影・アップロード</h3>
            <p className="text-sm text-muted-foreground">
              スマホで写真を撮影して、このサイトにアップロードします。
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-3 p-4 bg-white rounded-lg border shadow-sm">
            <div className="p-3 bg-blue-50 rounded-full text-blue-600">
              <Crop className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg">2. 調整・保存</h3>
            <p className="text-sm text-muted-foreground">
              ガイドに合わせて位置を調整し、画像を保存します。
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-3 p-4 bg-white rounded-lg border shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-bl font-bold">
              重要
            </div>
            <div className="p-3 bg-blue-50 rounded-full text-blue-600">
              <Printer className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg">3. コンビニで印刷</h3>
            <p className="text-sm text-muted-foreground">
              保存した画像をコンビニのマルチコピー機で<br/>
              <span className="font-bold text-red-500 text-base">「L判」</span>で印刷してください。
            </p>
          </div>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg border text-sm text-muted-foreground text-center">
          <p className="flex items-center justify-center gap-2 flex-wrap">
            <Smartphone className="w-4 h-4" />
            <span>
              印刷には「セブンイレブン（netprint）」や「ローソン・ファミマ（PrintSmash）」などのアプリを使うと便利です。
            </span>
          </p>
        </div>
      </section>

      {/* 対応サイズ一覧 */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-center text-slate-800">
          対応サイズ・用途一覧
        </h2>
        <Card>
          <CardContent className="p-0">
            <div className="grid grid-cols-1 divide-y">
              <div className="grid grid-cols-2 p-4 hover:bg-slate-50 transition-colors">
                <div className="font-medium">履歴書</div>
                <div className="text-right text-muted-foreground">40 × 30 mm</div>
              </div>
              <div className="grid grid-cols-2 p-4 hover:bg-slate-50 transition-colors">
                <div className="font-medium">マイナンバーカード・パスポート</div>
                <div className="text-right text-muted-foreground">45 × 35 mm</div>
              </div>
              <div className="grid grid-cols-2 p-4 hover:bg-slate-50 transition-colors">
                <div className="font-medium">運転免許証</div>
                <div className="text-right text-muted-foreground">30 × 24 mm</div>
              </div>
              <div className="grid grid-cols-2 p-4 hover:bg-slate-50 transition-colors">
                <div className="font-medium">その他</div>
                <div className="text-right text-muted-foreground">資格試験など</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 綺麗に撮るコツ */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-center text-slate-800">
          証明写真を綺麗に撮るコツ
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-none shadow-none bg-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                背景は白く
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                白い壁を背景にして撮影しましょう。柄のある壁紙や家具が写り込むと、証明写真として受理されない場合があります。
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-none bg-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                光は正面から
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                顔に影が入らないよう、窓の正面や明るい照明の下で撮影するのがおすすめです。逆光にならないように注意しましょう。
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-none bg-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                目線の高さで
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                スマホのレンズが目の高さに来るように構えます。上から撮りすぎたり下から撮りすぎたりすると、不自然な印象になります。
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

    </div>
  );
}
