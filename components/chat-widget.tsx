"use client";

import * as React from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";

// ... imports
import { getPricingConfigs } from "@/app/actions";

type Message = {
  id: string;
  sender: "bot" | "user";
  text: string;
  options?: string[];
};

type ChatState = "GREETING" | "SCOPE" | "DETAILS" | "BUDGET" | "NAME" | "CONTACT" | "FINISHED";

export function ChatWidget({ embedded = false }: { embedded?: boolean }) {
  const locale = useLocale();
  const [isOpen, setIsOpen] = React.useState(embedded);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [inputValue, setInputValue] = React.useState("");
  const [chatState, setChatState] = React.useState<ChatState>("GREETING");
  const [userData, setUserData] = React.useState<any>({});
  const [pricing, setPricing] = React.useState<Record<string, number>>({});
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const messagesContainerRef = React.useRef<HTMLDivElement>(null);

  // Content Dictionary
  const content = {
    es: {
      greeting: "¡Hola! Soy BrainBot 🧠. Ayudo a definir tu proyecto ideal. ¿Qué estás buscando hoy?",
      options: {
        dev: "Desarrollo de Software",
        mobile: "App Móvil",
        consulting: "Consultoría"
      },
      scope: "¿Es un proyecto nuevo desde cero o una mejora a uno existente?",
      optionsScope: ["Proyecto Nuevo", "Mejora / Mantenimiento"],
      design: "¿Tienes ya los diseños de UI/UX listos?",
      optionsDesign: ["Sí, todo listo", "Tengo wireframes", "No, necesito diseño"],
      budget: "Para asignarte el equipo correcto, ¿cuál es tu rango de presupuesto estimado?",
      optionsBudget: ["Menos de $500 USD", "$500 - $1,500 USD", "$1,500 - $5,000 USD", "Más de $5,000 USD"],
      name_prompt: "¡Entendido! Antes de continuar, ¿cuál es tu nombre?",
      email: "¡Perfecto! Por favor déjanos tu correo para enviarte una propuesta preliminar.",
      final: "Gracias. Un especialista humano te contactará en breve a",
      quote: "Basado en tus selecciones, el costo base estimado sería de"
    },
    en: {
      greeting: "Hi! I'm BrainBot 🧠. I help scope your ideal project. What are you looking for today?",
      options: {
        dev: "Software Development",
        mobile: "Mobile App",
        consulting: "Consulting"
      },
      scope: "Is this a brand new project or an enhancement to an existing one?",
      optionsScope: ["Brand New", "Enhancement / Maintenance"],
      design: "Do you have UI/UX designs ready?",
      optionsDesign: ["Yes, ready", "I have wireframes", "No, need design"],
      budget: "To assign the right team, what is your estimated budget range?",
      optionsBudget: ["Menos de $500 USD", "$500 - $1,500 USD", "$1,500 - $5,000 USD", "Más de $5,000 USD"],
      name_prompt: "Got it! Before we proceed, what is your name?",
      email: "Perfect! Please leave your email to send you a preliminary proposal.",
      final: "Thank you. A human specialist will contact you shortly at",
      quote: "Based on your selections, the estimated base cost starts at"
    }
  };

  const t = content[locale as keyof typeof content] || content['es'];



  // Initial Load
  React.useEffect(() => {
    getPricingConfigs().then(configs => {
        const prices: Record<string, number> = {};
        configs.forEach((c:any) => prices[c.key] = c.value);
        setPricing(prices);
    });
  }, []);

  const hasInitialized = React.useRef(false);

  React.useEffect(() => {
    if (!hasInitialized.current && messages.length === 0) {
       addMessage(t.greeting, "bot", [t.options.dev, t.options.mobile, t.options.consulting]);
       hasInitialized.current = true;
    }
  }, [locale]); // Reset/Re-init on locale change if empty

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleOptionClick = (option: string) => {
    addMessage(option, "user");
    
    setTimeout(() => {
      processBotResponse(option);
    }, 600);
  };

  const processBotResponse = (lastUserChoice: string) => {
    let responseText = "";
    let nextOptions: string[] | undefined;
    let nextState: ChatState = chatState;

    switch (chatState) {
        case "GREETING":
            setUserData({ ...userData, type: lastUserChoice });
            responseText = t.scope;
            nextOptions = t.optionsScope;
            nextState = "SCOPE";
            break;
        case "SCOPE":
             setUserData({ ...userData, scope: lastUserChoice });
             if (lastUserChoice.includes("Nuevo") || lastUserChoice.includes("New")) {
                 responseText = t.design;
                 nextOptions = t.optionsDesign;
                 nextState = "DETAILS";
             } else {
                 // Skip design question for maintenance
                 responseText = t.budget;
                 nextOptions = t.optionsBudget;
                 nextState = "BUDGET";
             }
             break;
        case "DETAILS":
             setUserData({ ...userData, design: lastUserChoice });
             
             // Dynamic pricing check!
             let priceMsg = "";
             if ((lastUserChoice.includes("No") || lastUserChoice.includes("need")) && pricing['hourly_rate']) {
                 priceMsg = ` (${t.quote} $${pricing['hourly_rate']}/hr)`;
             } else if (lastUserChoice.includes("listo") && pricing['landing_base']) {
                 // simplistic rule
                  priceMsg = ` (${t.quote} $${pricing['landing_base']})`;
             }

             responseText = t.budget + priceMsg;
             nextOptions = t.optionsBudget;
             nextState = "BUDGET";
             break;
        case "BUDGET":
              setUserData({ ...userData, budget: lastUserChoice });
              responseText = t.name_prompt;
              nextState = "NAME";
              break;
        case "NAME":
              // This case usually triggered by handleSend for text input, but if we had name options...
              // Actually processBotResponse is called for OPTIONS. 
              // Name is entered via text, so look at handleSend.
              // However, we might reuse this if we want to confirm name? No.
              break;
        default:
            break;
    }

    setChatState(nextState);
    if (responseText) {
        addMessage(responseText, "bot", nextOptions);
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    addMessage(inputValue, "user");

    if (chatState === "NAME") {
        setUserData({ ...userData, name: inputValue });
        setChatState("CONTACT");
        setTimeout(() => {
            addMessage(t.email, "bot");
        }, 600);
        setInputValue("");
        return;
    }
    
    // Capture email and send to NocoDB via API
    if (chatState === "CONTACT") {
         setChatState("FINISHED");
         // Optimistic UI update
        setTimeout(() => {
             addMessage(`${t.final} ${inputValue}`, "bot");
        }, 600);

        try {
            const leadData = {
                ...userData,
                email: inputValue,
                locale: locale
            };
            
            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(leadData)
            });
            
            const resIds = await response.json();
            console.log("DEBUG_RESPONSE:", JSON.stringify(resIds, null, 2));

            console.log("Lead submitted successfully");
        } catch (e) {
            console.error("Error submitting lead:", e);
        }
    }
    
    setInputValue("");
  };

  const addMessage = (text: string, sender: "bot" | "user", options?: string[]) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), sender, text, options },
    ]);
  };

  // Render content logic
  const ChatContent = (
    <div className={`flex flex-col h-full bg-zinc-900 overflow-hidden ${embedded ? 'rounded-xl border border-white/10 shadow-2xl' : 'rounded-2xl border border-white/10 shadow-2xl'}`}>
         {/* Header */}
         <div className="bg-primary px-4 py-3 flex justify-between items-center text-white shrink-0">
              <div className="flex items-center gap-2">
                <Bot size={20} />
                <span className="font-semibold">BrainBot AI ({locale.toUpperCase()})</span>
              </div>
              {!embedded && (
                  <button 
                    onClick={() => setIsOpen(false)} 
                    className="hover:bg-white/20 rounded-full p-1 transition-colors"
                  >
                    <X size={18} />
                  </button>
              )}
        </div>

        {/* Messages */}
        <div 
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-black/50 min-h-[300px]"
        >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                      msg.sender === "user"
                        ? "bg-primary text-white rounded-br-none"
                        : "bg-zinc-800 text-zinc-100 rounded-bl-none border border-white/5"
                    }`}
                  >
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}
              {/* Options */}
              {messages.length > 0 && messages[messages.length - 1].sender === "bot" && messages[messages.length - 1].options && (
                 <div className="flex flex-wrap gap-2 mt-2">
                    {messages[messages.length - 1].options!.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleOptionClick(opt)}
                        className="text-xs bg-zinc-800 hover:bg-zinc-700 text-primary border border-primary/30 rounded-full px-3 py-1.5 transition-colors"
                      >
                        {opt}
                      </button>
                    ))}
                 </div>
              )}
        </div>

        {/* Input */}
        <div className="bg-zinc-900 p-3 border-t border-white/10 flex gap-2 shrink-0">
              <input
                className="flex-1 bg-zinc-800 rounded-full px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder={locale === 'en' ? "Type a message..." : "Escribe un mensaje..."}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                disabled={chatState !== "CONTACT" && chatState !== "FINISHED" && chatState !== "NAME"} // Only enable input for email and name
              />
              <Button size="sm" className="rounded-full w-9 h-9 p-0" onClick={handleSend} disabled={!inputValue.trim()}>
                <Send size={16} />
              </Button>
        </div>
    </div>
  );

  if (embedded) {
      return (
          <div className="w-full h-full max-w-md mx-auto">
              {ChatContent}
          </div>
      )
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-4 z-50 w-[90vw] max-w-[350px] md:right-8"
          >
            {ChatContent}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8">
        {/* Pulse effect */}
        {!isOpen && (
           <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
        )}
        <motion.button
            className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 transition-transform hover:scale-110 active:scale-95"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            {isOpen ? <X /> : <MessageCircle />}
        </motion.button>
      </div>
    </>
  );
}
