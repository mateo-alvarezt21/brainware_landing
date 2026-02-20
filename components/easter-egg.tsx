
"use client";

import { useEffect } from "react";

export function EasterEgg() {
  useEffect(() => {
    console.log(
      `%c
   .ad88888888888888888888888a.
  d8"'                      "8b
 d8'                          '8b
d8'                            '8b
88                              88
88                              88
88                              88
88           ,d8888b,           88
88          d8"'  '"8b          88
88          88.    .88          88
88          '8b    d8'          88
88           '888888'           88
88                              88
88     d8b              d8b     88
88    d8'8b            d8'8b    88
88   d8' '8b          d8' '8b   88
88  d8'   '8b        d8'   '8b  88
88 d8'     '8b      d8'     '8b 88
88                             88
88.                          .88
'8b                        d8'
 '8b                      d8'
  '8b.                  .d8'
   '88888888888888888888' 

       ¿Qué te pasa a ti maricón?
      `,
      "font-family: monospace; font-weight: bold; font-size: 14px; color: #FFD700; background: #000; padding: 10px;"
    );
  }, []);

  return null;
}
