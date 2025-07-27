import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zbeleh.ai - Strategic Investment Report",
  description: "A pragmatic, technology-driven solution for Lebanon's waste crisis. Strategic investment report for Zbeleh.ai waste management platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <script 
          async 
          defer 
          src="https://tianji.motherfucking.fun/tracker.js" 
          data-website-id="cmdez8mwo12vw5kbiejavldfq"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
    var _mtm = window._mtm = window._mtm || [];
    _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
    (function() {
      var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
      g.async=true; g.src='https://matomo.motherfucking.fun/js/container_7tMWVUlD.js'; s.parentNode.insertBefore(g,s);
    })();
            `,
          }}
        ></script>
      </head>
      <body
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}
