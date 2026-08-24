'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { simplifyDebts } from '@/lib/settlement-algorithm';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Users, Plus, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const GroupsView: React.FC = () => {
  const { 
    currentUser, 
    groups, 
    groupMembers, 
    friends, 
    expenses, 
    settlements, 
    currency, 
    openCreateGroupModal, 
    openAddExpenseModal 
  } = useAppStore();

  const [activeGroupId, setActiveGroupId] = useState<string>(groups[0]?.id || '');

  const allUsers = [currentUser, ...friends];
  const selectedGroup = groups.find((g) => g.id === activeGroupId) || groups[0];

  if (!selectedGroup) return null;

  // Filter members of active group
  const memberUserIds = groupMembers
    .filter((gm) => gm.group_id === selectedGroup.id)
    .map((gm) => gm.user_id);
  
  const members = allUsers.filter((u) => memberUserIds.includes(u.id));

  // Filter expenses of active group
  const groupExpenses = expenses.filter((e) => e.group_id === selectedGroup.id);
  const totalGroupSpend = groupExpenses.reduce((acc, curr) => acc + curr.amount, 0);

  // Group debt simplification algorithm
  const simplifiedGroupDebts = simplifyDebts(memberUserIds, groupExpenses, settlements);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-white">Ortak Harcama Grupları</h1>
          <p className="text-xs text-zinc-400">Ev, tatil ve etkinlik harcamalarını otomatik basitleştirin</p>
        </div>
        <button
          onClick={() => openCreateGroupModal()}
          className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-zinc-950 font-bold text-xs rounded-xl shadow-lg shadow-purple-500/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Yeni Grup Oluştur</span>
        </button>
      </div>

      {/* Group Selector Cards Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {groups.map((g) => {
          const isSelected = g.id === selectedGroup.id;
          const gExpenses = expenses.filter((e) => e.group_id === g.id);
          const gSpend = gExpenses.reduce((sum, e) => sum + e.amount, 0);

          return (
            <div
              key={g.id}
              onClick={() => setActiveGroupId(g.id)}
              className={`glass-panel p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
                isSelected
                  ? 'border-purple-500/60 bg-gradient-to-br from-purple-950/40 to-zinc-900/90 shadow-lg shadow-purple-950/30'
                  : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <img
                  src={g.image_url}
                  alt={g.name}
                  className="w-12 h-12 rounded-xl object-cover border border-zinc-700 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold text-white truncate">{g.name}</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">{gExpenses.length} Harcama</p>
                  <div className="text-xs font-semibold text-purple-300 mt-1">
                    {formatCurrency(gSpend, currency)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Group Detail Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Group Expenses Stream */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-panel p-5 rounded-2xl border border-zinc-800">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-4">
              <div>
                <h3 className="text-base font-bold text-white">{selectedGroup.name} - Harcamalar</h3>
                <p className="text-xs text-zinc-400">Grup içinde yapılan harcama kayıtları</p>
              </div>
              <button
                onClick={() => openAddExpenseModal(selectedGroup.id)}
                className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold rounded-lg transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Gruba Harcama Ekle</span>
              </button>
            </div>

            <div className="space-y-3">
              {groupExpenses.length === 0 ? (
                <div className="text-center py-8 text-zinc-500 text-sm">
                  Bu grupta henüz harcama bulunmuyor.
                </div>
              ) : (
                groupExpenses.map((exp) => {
                  const payer = allUsers.find((u) => u.id === exp.paid_by);
                  return (
                    <div
                      key={exp.id}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={payer?.avatar_url}
                          alt={payer?.full_name}
                          className="w-9 h-9 rounded-full object-cover border border-zinc-700"
                        />
                        <div>
                          <h4 className="text-sm font-semibold text-zinc-100">{exp.description}</h4>
                          <p className="text-xs text-zinc-400">
                            Ödeyen: <span className="text-zinc-200 font-medium">{payer?.full_name}</span> • {formatDate(exp.date || exp.created_at)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-extrabold text-emerald-400">
                          {formatCurrency(exp.amount, exp.currency)}
                        </span>
                        <p className="text-[10px] text-zinc-500">{exp.splits.length} Katılımcı</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right Col: Members & Debt Simplification Algorithm */}
        <div className="space-y-4">
          {/* Members Card */}
          <div className="glass-panel p-4 rounded-2xl border border-zinc-800">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">Grup Üyeleri ({members.length})</h3>
            <div className="space-y-2">
              {members.map((m) => (
                <div key={m.id} className="flex items-center gap-2.5 p-2 rounded-xl bg-zinc-900/40">
                  <img src={m.avatar_url} alt={m.full_name} className="w-7 h-7 rounded-full object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-zinc-200 truncate">
                      {m.id === currentUser.id ? `Sen (${m.full_name})` : m.full_name}
                    </p>
                    <p className="text-[10px] text-zinc-500">@{m.username}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Simplified Debt Graph Algorithm Box */}
          <div className="glass-panel p-4 rounded-2xl border border-purple-500/30 bg-gradient-to-b from-purple-950/20 to-zinc-900/90">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <h3 className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                Mahsuplaşma & Basitleştirilmiş Borçlar
              </h3>
            </div>
            <p className="text-[11px] text-zinc-400 mb-3">
              Algoritma gruptaki toplam transfer sayısını en aza indirecek şekilde borçları basitleştirir.
            </p>

            <div className="space-y-2">
              {simplifiedGroupDebts.length === 0 ? (
                <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Tüm grup borçları kapalı ve dengede!</span>
                </div>
              ) : (
                simplifiedGroupDebts.map((d, idx) => {
                  const debtor = allUsers.find((u) => u.id === d.fromUserId);
                  const creditor = allUsers.find((u) => u.id === d.toUserId);

                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs"
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="font-semibold text-zinc-200 truncate">
                          {debtor?.id === currentUser.id ? 'Sen' : debtor?.full_name}
                        </span>
                        <ArrowRight className="w-3 h-3 text-purple-400 shrink-0" />
                        <span className="font-semibold text-zinc-200 truncate">
                          {creditor?.id === currentUser.id ? 'Sen' : creditor?.full_name}
                        </span>
                      </div>
                      <span className="font-extrabold text-purple-300 shrink-0">
                        {formatCurrency(d.amount, currency)}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
