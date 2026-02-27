/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { Users, TrendingUp, Award } from 'lucide-react';

const SponsorBanner = () => {
  return (
    <section className="py-16 bg-brand-dark text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold mb-4">
              ¿Quieres Ganar Dinero con Nosotros?
            </h2>
            <p className="text-xl opacity-90">
              Únete a nuestro programa de sponsors y comienza a generar ingresos
              recomendando productos increíbles.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: <Users size={32} />, label: "Red Global", value: "10K+" },
              { icon: <TrendingUp size={32} />, label: "Crecimiento", value: "40%" },
              { icon: <Award size={32} />, label: "Premios", value: "$1M+" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-brand mb-4 inline-flex">{stat.icon}</div>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-brand px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-light transition-colors"
          >
            ¡Conviértete en Sponsor!
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default SponsorBanner;