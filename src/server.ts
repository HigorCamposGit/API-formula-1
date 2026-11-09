import fastify from "fastify";
import cors from "@fastify/cors";

// Cria servidor com configuração de log
const server = fastify({ logger: true });

// Configuração de cors
server.register(cors, {
  origin: "*", // quem pode acessar: * = todos
});

// Define a porta do servidor
const PORT: number = parseInt(process.env.PORT || "3333");

const teams = [
  { id: 1, name: "McLaren", base: "Woking, United Kingdom" },
  { id: 2, name: "Ferrari", base: "Maranello, Italy" },
  { id: 3, name: "Red Bull Racing", base: "Milton Keynes, United Kingdom" },
  { id: 4, name: "Mercedes", base: "Brackley, United Kingdom" },
  { id: 5, name: "Aston Martin", base: "Silverstone, United Kingdom" },
  { id: 6, name: "Alpine", base: "Enstone, United Kingdom" },
  { id: 7, name: "Haas", base: "Kannapolis, United States" },
  { id: 8, name: "RB (Racing Bulls)", base: "Faenza, Italy" },
  { id: 9, name: "Williams", base: "Grove, United Kingdom" },
  { id: 10, name: "Audi F1 Team", base: "Hinwil, Switzerland" }
];

const drivers = [
  { id: 1, name: "Max Verstappen", team: "Red Bull Racing" },
  { id: 2, name: "Lewis Hamilton", team: "Ferrari" },
  { id: 3, name: "Lando Norris", team: "McLaren" },
  { id: 4, name: "Charles Leclerc", team: "Ferrari" },
  { id: 5, name: "Oscar Piastri", team: "McLaren" },
  { id: 6, name: "George Russell", team: "Mercedes" },
  { id: 7, name: "Kimi Antonelli", team: "Mercedes" },
  { id: 8, name: "Gabriel Bortoleto", team: "Audi F1 Team" },
  { id: 9, name: "Fernando Alonso", team: "Aston Martin" },
  { id: 10, name: "Pierre Gasly", team: "Alpine" },
  { id: 11, name: "Jack Doohan", team: "Alpine" },
  { id: 12, name: "Oliver Bearman", team: "Haas" },
  { id: 13, name: "Esteban Ocon", team: "Haas" },
  { id: 14, name: "Liam Lawson", team: "Red Bull Racing" },
  { id: 15, name: "Yuki Tsunoda", team: "RB (Racing Bulls)" },
  { id: 16, name: "Isack Hadjar", team: "RB (Racing Bulls)" },
  { id: 17, name: "Lance Stroll", team: "Aston Martin" },
  { id: 18, name: "Alexander Albon", team: "Williams" },
  { id: 19, name: "Carlos Sainz", team: "Williams" },
  { id: 20, name: "Nico Hülkenberg", team: "Audi F1 Team" }
];

const circuits = [
  { id: 1, name: "Monaco", location: "Monte Carlo, Monaco" },
  { id: 2, name: "Silverstone", location: "Silverstone, United Kingdom" },
  { id: 3, name: "Spa-Francorchamps", location: "Stavelot, Belgium" },
  { id: 4, name: "Monza", location: "Monza, Italy" },
  { id: 5, name: "Suzuka", location: "Suzuka, Japan" },
  { id: 6, name: "Interlagos", location: "São Paulo, Brazil" },
  { id: 7, name: "Catalunya", location: "Barcelona, Spain" },
  { id: 8, name: "Circuit of the Americas", location: "Austin, USA" }
];

// Rota principal
server.get("/", async (req, res) => {
  // configuração do response
  res.type("application/json").code(200);
  // retornando dados
  return {
    message: "Minimal API da Fórmula 1 - 2026 com Node e Fastify - Você pode consultar em seu navegador: http://localhost:3333 chamar piloto: /drivers ,chamar equipe: /teams, chamar circuito: chamar circuitos: /circuits ",
  };
});

// Rota ('/teams') + controller (render())
server.get("/teams", async (req, res) => {
  // configuração do response
  res.type("application/json").code(200);
  // retornando dados
  return { teams }; // Englobando com chaves -> o nome da constante é setado no resultado
});

server.get("/drivers", async (req, res) => {
  // configuração do response
  res.type("application/json").code(200);
  // retornando dados
  return { drivers };
});

// Contrato para o parâmetro
interface DriverParams {
  id: string;
}

// Rota com parâmetro
// <{Params: DriverParams}> -> recebe os parâmetros que seguem o contrato
server.get<{ Params: DriverParams }>("/drivers/:id", async (req, res) => {
  const id = parseInt(req.params.id); // Converte o valor recebido para inteiro
  const driver = drivers.find((d) => d.id === id); // Filtra driver

  if (!driver) {
    res.type("application/json").code(404);
    return { message: "Driver Not Found" };
  } else {
    res.type("application/json").code(200);
    return { driver };
  }
});

server.get("/circuits", async (req, res) => {
  // configuração do response
  res.type("application/json").code(200);
  // retornando dados
  return { circuits };
});

// Inicialização segura do servidor Fastify
server.listen({ port: PORT }, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  console.log(`Servidor rodando em: http://localhost:${PORT}`);
});