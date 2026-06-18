import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2 } from "lucide-react";

const comarcas = [
  "L'Horta Nord", "L'Horta Sud", "La Safor", "La Marina Alta", "El Comtat", 
  "L'Alcoià", "La Vall d'Albaida", "La Ribera Alta", "La Canal de Navarrés", 
  "El Vinalopó", "La Vega Baixa", "Alt Palància", "L'Alt Millars", "L'Alcalatén", 
  "La Plana Alta", "La Plana Baixa", "Els Ports", "El Maestrat", "Alt Maestrat", "El Baix Maestrat"
];

const step1Schema = z.object({
  fullName: z.string().min(3, "El nom complet és requerit"),
  email: z.string().email("Correu electrònic invàlid"),
});

const step2Schema = z.object({
  fullName: z.string(),
  email: z.string(),
  phone: z.string().min(9, "Telèfon invàlid"),
  comarca: z.string().min(1, "Selecciona una comarca"),
});

export function Afiliate() {
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof step2Schema>>({
    resolver: zodResolver(step === 1 ? step1Schema : step2Schema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      comarca: "",
    },
  });

  const onNext = async () => {
    const isValid = await form.trigger(["fullName", "email"]);
    if (isValid) setStep(2);
  };

  const onSubmit = async (values: z.infer<typeof step2Schema>) => {
    console.log("Form submitted:", values);
    setIsSuccess(true);
  };

  return (
    <section id="afiliate" className="py-32 bg-[#111111]">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-montserrat font-black text-5xl md:text-6xl text-white mb-6 leading-tight">
              Forma part de la <span className="text-[#E30613]">generació de ferro</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed mb-8">
              No som la generació de cristall que es trenca. Som els que ens emplem de fang, els que no abandonen, els que lideren. Uneix-te a nosaltres.
            </p>
            <div className="hidden lg:block w-24 h-2 bg-[#E30613]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-2xl relative overflow-hidden"
          >
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle2 size={48} />
                </motion.div>
                <h3 className="font-montserrat font-black text-3xl text-gray-900 mb-4">
                  Benvingut/da a JSPV!
                </h3>
                <p className="text-gray-600 font-medium text-lg">
                  Ens posarem en contacte amb tu aviat.
                </p>
              </motion.div>
            ) : (
              <>
                <div className="flex justify-center gap-2 mb-8">
                  <div className={`w-12 h-2 rounded-full transition-colors ${step >= 1 ? "bg-[#E30613]" : "bg-gray-200"}`} />
                  <div className={`w-12 h-2 rounded-full transition-colors ${step >= 2 ? "bg-[#E30613]" : "bg-gray-200"}`} />
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <AnimatePresence mode="wait">
                      {step === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="space-y-6"
                        >
                          <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700 font-bold">Nom complet</FormLabel>
                                <FormControl>
                                  <Input placeholder="Escriu el teu nom" {...field} className="h-14 bg-gray-50 border-gray-200 text-lg" data-testid="input-fullname" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700 font-bold">Correu electrònic</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="nom@exemple.com" {...field} className="h-14 bg-gray-50 border-gray-200 text-lg" data-testid="input-email" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button type="button" onClick={onNext} className="w-full h-14 bg-gray-900 hover:bg-gray-800 text-white font-montserrat font-bold text-lg" data-testid="button-next">
                            Continuar
                          </Button>
                        </motion.div>
                      )}

                      {step === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="space-y-6"
                        >
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700 font-bold">Telèfon</FormLabel>
                                <FormControl>
                                  <Input type="tel" placeholder="600 000 000" {...field} className="h-14 bg-gray-50 border-gray-200 text-lg" data-testid="input-phone" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="comarca"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700 font-bold">Comarca</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="h-14 bg-gray-50 border-gray-200 text-lg" data-testid="select-comarca">
                                      <SelectValue placeholder="Selecciona la teua comarca" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {comarcas.map((c) => (
                                      <SelectItem key={c} value={c}>{c}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="flex gap-4">
                            <Button type="button" variant="outline" onClick={() => setStep(1)} className="h-14 w-24 text-gray-600 font-bold" data-testid="button-back">
                              Tornar
                            </Button>
                            <Button type="submit" className="flex-1 h-14 bg-[#E30613] hover:bg-[#c20510] text-white font-montserrat font-bold text-lg" data-testid="button-submit">
                              Vull afiliar-me
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>
                </Form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
