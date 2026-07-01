# Control-de-gastos-presupuestos-e-ingresos-context-API

Esta herramienta permite planificar presupuestos personales y registrar de forma sistemática diferentes consumos clasificados por categorías. Mediante la integración de la Context API de React, se establece un proveedor global de datos (BudgetProvider) que distribuye el estado del presupuesto de manera ágil entre componentes distantes de la interfaz de usuario, evitando el acoplamiento o la necesidad de transmitir propiedades en cascada (prop drilling). El motor interno utiliza un Reducer (budgetReducer) estructurado en TypeScript para regular la adición de gastos, las modificaciones de presupuesto, la gestión de modales interactivos y el filtrado dinámico de información.

# Características Claves
- Distribución global del estado: Implementación de Context API para disponibilizar el estado del presupuesto y el despachador de acciones (dispatch) de manera global.
- Control presupuestario: Definición dinámica de límites presupuestarios iniciales e interfaces modales para la captura estructurada de nuevos consumos.
- Interfaz interactiva y tipado fuerte: Acciones controladas y tipadas (define-budget, show-modal, hide-modal) para prevenir estados inconsistentes en la aplicación.

# Stack Tecnológico
- Frontend: React, TypeScript.
- Estilos: Tailwind CSS.
- Herramientas de Construcción: Vite.

# Valor Técnico Demostrado
- Solución estructurada de comunicación entre componentes mediante la integración de la Context API (createContext y useContext).
- Gestión descentralizada pero predecible de estados combinando useReducer y Context Provider.
- Control riguroso de interfaces y modelado de datos en TypeScript para el dominio presupuestario.

