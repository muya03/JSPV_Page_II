import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/i18n/context";
import NotFound from "@/pages/not-found";
import Inicio from "@/pages/Inicio";
import Partit from "@/pages/Partit";
import Equip from "@/pages/Equip";
import Historia from "@/pages/Historia";
import Valors from "@/pages/Valors";
import Actualitat from "@/pages/Actualitat";
import NewsDetail from "@/pages/NewsDetail";
import Campanyes from "@/pages/Campanyes";
import Habitatge from "@/pages/campaigns/Habitatge";
import GeneracioDeFerro from "@/pages/campaigns/GeneracioDeFerro";
import Institucions from "@/pages/Institucions";
import Afiliat from "@/pages/Afiliat";
import Contacte from "@/pages/Contacte";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Inicio} />
      <Route path="/partit" component={Partit} />
      <Route path="/partit/equip" component={Equip} />
      <Route path="/partit/historia" component={Historia} />
      <Route path="/partit/valors" component={Valors} />
      <Route path="/actualitat" component={Actualitat} />
      <Route path="/actualitat/:slug" component={NewsDetail} />
      <Route path="/campanyes" component={Campanyes} />
      <Route path="/campanyes/habitatge-es-un-dret" component={Habitatge} />
      <Route path="/campanyes/generacio-de-ferro" component={GeneracioDeFerro} />
      <Route path="/institucions" component={Institucions} />
      <Route path="/afiliat" component={Afiliat} />
      <Route path="/contacte" component={Contacte} />
      <Route component={NotFound} />
    </Switch>
  );
}

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export default function App({ ssrPath }: { ssrPath?: string } = {}) {
  return (
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={BASE} ssrPath={ssrPath}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </LanguageProvider>
  );
}
