// Framer Motion animation features, split into their own chunk and loaded after first paint.
// domMax includes layout animations, which the nav underline and résumé tab pill (layoutId) need.
import { domMax } from "framer-motion";

export default domMax;
