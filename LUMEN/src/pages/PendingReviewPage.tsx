// import { motion } from 'framer-motion';
// import { useState } from 'react';
// import { mockTransactions, formatCurrency } from '../utils/mockData';
// import ProgressBar from '../components/ProgressBar';
// import { AlertTriangle, CheckCircle, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
// import { useToastStore } from '../store/toastStore';

// export default function PendingReviewPage() {
//   const [filter, setFilter] = useState<'all' | 'high' | 'medium'>('all');
//   const [expandedId, setExpandedId] = useState<string | null>(null);
//   const addToast = useToastStore((state) => state.addToast);

//   const flaggedTransactions = mockTransactions.filter((t) => t.status === 'flagged');
//   const highPriority = flaggedTransactions.filter((t) => (t.riskScore || 0) >= 60);
//   const mediumPriority = flaggedTransactions.filter((t) => (t.riskScore || 0) < 60);

//   const displayedTransactions =
//     filter === 'all'
//       ? flaggedTransactions
//       : filter === 'high'
//       ? highPriority
//       : mediumPriority;

//   const handleConfirm = (_id: string, merchant: string) => {
//     addToast('success', `Transaction from ${merchant} confirmed!`);
//   };

//   const handleReject = (_id: string, merchant: string) => {
//     addToast('error', `Transaction from ${merchant} reported as fraud`);
//   };

//   // Mock historical data for the chart
//   const historicalData = [
//     { month: 'Sep', amount: 60 },
//     { month: 'Oct', amount: 55 },
//     { month: 'Nov', amount: 62 },
//     { month: 'Dec', amount: 58 },
//     { month: 'Jan', amount: 144 },
//   ];

//   return (
//     <div className="min-h-screen pb-20">
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <h1 className="text-3xl font-bold mb-2">⏳ Pending Review Queue</h1>
//         <p className="text-text-secondary mb-6">Items requiring your confirmation</p>
//       </motion.div>

//       {/* Filters */}
//       <div className="flex gap-4 mb-8">
//         <button
//           onClick={() => setFilter('all')}
//           className={`px-6 py-2 rounded-lg font-medium transition-all ${
//             filter === 'all'
//               ? 'bg-cyan text-black'
//               : 'glass-card hover:bg-white/10 text-text-secondary'
//           }`}
//         >
//           All ({flaggedTransactions.length})
//         </button>
//         <button
//           onClick={() => setFilter('high')}
//           className={`px-6 py-2 rounded-lg font-medium transition-all ${
//             filter === 'high'
//               ? 'bg-danger text-white'
//               : 'glass-card hover:bg-white/10 text-text-secondary'
//           }`}
//         >
//           High Priority ({highPriority.length})
//         </button>
//         <button
//           onClick={() => setFilter('medium')}
//           className={`px-6 py-2 rounded-lg font-medium transition-all ${
//             filter === 'medium'
//               ? 'bg-warning text-black'
//               : 'glass-card hover:bg-white/10 text-text-secondary'
//           }`}
//         >
//           Medium ({mediumPriority.length})
//         </button>
//       </div>

//       {/* Transactions List */}
//       <div className="space-y-6">
//         {displayedTransactions.map((transaction, index) => {
//           const isHigh = (transaction.riskScore || 0) >= 60;
//           const isExpanded = expandedId === transaction.id;

//           return (
//             <motion.div
//               key={transaction.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//               className={`glass-card p-6 rounded-xl border-2 ${
//                 isHigh ? 'border-danger/30' : 'border-warning/30'
//               }`}
//             >
//               {/* Priority Badge */}
//               <div className="flex items-center gap-2 mb-4">
//                 {isHigh ? (
//                   <>
//                     <AlertTriangle className="w-5 h-5 text-danger" />
//                     <span className="font-bold text-danger">HIGH PRIORITY</span>
//                   </>
//                 ) : (
//                   <>
//                     <AlertTriangle className="w-5 h-5 text-warning" />
//                     <span className="font-bold text-warning">MEDIUM PRIORITY</span>
//                   </>
//                 )}
//               </div>

//               <div className="grid md:grid-cols-[200px,1fr] gap-6">
//                 {/* Receipt Thumbnail */}
//                 <div className="bg-bg-tertiary rounded-lg aspect-square flex items-center justify-center">
//                   <span className="text-6xl">📄</span>
//                 </div>

//                 {/* Transaction Details */}
//                 <div className="space-y-4">
//                   <div>
//                     <h3 className="text-2xl font-bold mb-1">{transaction.merchant}</h3>
//                     <p className="text-xl text-cyan font-semibold">
//                       {formatCurrency(transaction.amount, transaction.currency)}
//                     </p>
//                     <p className="text-text-secondary">
//                       {transaction.date.toLocaleDateString('en-US', {
//                         month: 'short',
//                         day: 'numeric',
//                         year: 'numeric',
//                       })}
//                     </p>
//                   </div>

//                   {/* Flag Reasons */}
//                   <div>
//                     <p className="font-semibold mb-2">⚠️ Flagged because:</p>
//                     <ul className="space-y-1">
//                       {transaction.flagReasons?.map((reason, i) => (
//                         <li key={i} className="text-text-secondary text-sm">
//                           • {reason}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>

//                   {/* Risk Score */}
//                   <div>
//                     <p className="text-sm font-medium mb-2">Risk Score: {transaction.riskScore}/100</p>
//                     <ProgressBar
//                       current={transaction.riskScore || 0}
//                       max={100}
//                       color={isHigh ? 'danger' : 'warning'}
//                       showPercentage={false}
//                     />
//                     <p className="text-sm text-text-secondary mt-1">
//                       {isHigh ? 'High Risk' : 'Medium Risk'}
//                     </p>
//                   </div>

//                   {/* Actions */}
//                   <div className="flex gap-3 pt-2">
//                     <button
//                       onClick={() => setExpandedId(isExpanded ? null : transaction.id)}
//                       className="px-4 py-2 glass-card hover:bg-white/10 rounded-lg transition-all font-medium flex items-center gap-2"
//                     >
//                       Tell Me More
//                       {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
//                     </button>
//                     <button
//                       onClick={() => handleConfirm(transaction.id, transaction.merchant)}
//                       className="px-6 py-2 bg-success hover:bg-success/80 text-white rounded-lg transition-all font-medium flex items-center gap-2"
//                     >
//                       <CheckCircle className="w-5 h-5" />
//                       Confirm
//                     </button>
//                     <button
//                       onClick={() => handleReject(transaction.id, transaction.merchant)}
//                       className="px-6 py-2 bg-danger hover:bg-danger/80 text-white rounded-lg transition-all font-medium flex items-center gap-2"
//                     >
//                       <XCircle className="w-5 h-5" />
//                       Reject
//                     </button>
//                   </div>

//                   {/* Expanded Details */}
//                   {isExpanded && (
//                     <motion.div
//                       initial={{ opacity: 0, height: 0 }}
//                       animate={{ opacity: 1, height: 'auto' }}
//                       exit={{ opacity: 0, height: 0 }}
//                       className="pt-4 border-t border-white/10 space-y-4"
//                     >
//                       <div>
//                         <h4 className="font-semibold mb-2">Items Purchased:</h4>
//                         <ul className="space-y-1">
//                           {transaction.items?.map((item, i) => (
//                             <li key={i} className="text-text-secondary text-sm">
//                               • {item}
//                             </li>
//                           ))}
//                         </ul>
//                       </div>

//                       <div>
//                         <h4 className="font-semibold mb-2">📈 Your Grocery Spending History</h4>
//                         <div className="h-48 bg-bg-tertiary rounded-lg p-4">
//                           <ResponsiveContainer width="100%" height="100%">
//                             <BarChart data={historicalData}>
//                               <XAxis dataKey="month" stroke="#737373" />
//                               <YAxis stroke="#737373" />
//                               <Tooltip
//                                 contentStyle={{
//                                   backgroundColor: '#1A1A1A',
//                                   border: '1px solid rgba(255,255,255,0.1)',
//                                   borderRadius: '8px',
//                                 }}
//                               />
//                               <Bar dataKey="amount" fill="#00D9FF" />
//                             </BarChart>
//                           </ResponsiveContainer>
//                         </div>
//                         <p className="text-sm text-text-secondary mt-2">
//                           Your average: $60 | This purchase: $144 (140% more)
//                         </p>
//                       </div>

//                       <div className="bg-cyan/10 border border-cyan/30 rounded-lg p-4">
//                         <h4 className="font-semibold mb-2 text-cyan">💡 AI Context</h4>
//                         <p className="text-sm text-text-secondary">
//                           Based on your spending patterns, this is unusually large for groceries. If
//                           this was for a special occasion (party catering, bulk purchase), it's normal.
//                         </p>
//                       </div>
//                     </motion.div>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           );
//         })}
//       </div>

//       {displayedTransactions.length === 0 && (
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="glass-card p-12 rounded-xl text-center"
//         >
//           <div className="text-6xl mb-4">✅</div>
//           <h2 className="text-2xl font-bold mb-2">All caught up!</h2>
//           <p className="text-text-secondary">No pending reviews at the moment</p>
//         </motion.div>
//       )}
//     </div>
//   );
// }
