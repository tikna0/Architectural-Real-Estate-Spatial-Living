import React from 'react';
import { X, Trash2, Calendar, Eye, Bookmark } from 'lucide-react';
import { Property } from '../types';
import { sound } from '../utils/audio';

interface SavedDrawerProps {
  properties: Property[];
  savedIds: string[];
  isOpen: boolean;
  onClose: () => void;
  onRemove: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onScheduleShowing: (property: Property) => void;
}

export const SavedDrawer: React.FC<SavedDrawerProps> = ({
  properties,
  savedIds,
  isOpen,
  onClose,
  onRemove,
  onSelectProperty,
  onScheduleShowing
}) => {
  if (!isOpen) return null;

  const savedList = properties.filter((p) => savedIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Dimmer Scrim */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      />

      {/* Slide-over Drawer (Apple Style) */}
      <div className="relative w-full max-w-md bg-white shadow-2xl z-10 h-full flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-black/5 flex items-center justify-between apple-glass">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-[#0071E3] fill-current" />
            <h3 className="text-sm font-semibold text-[#1D1D1F]">
              Saved Residences ({savedList.length})
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="apple-press p-1.5 rounded-full text-[#86868B] hover:text-[#1D1D1F] hover:bg-black/5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {savedList.length === 0 ? (
            <div className="py-20 text-center text-xs text-[#86868B] space-y-2">
              <Bookmark className="w-8 h-8 mx-auto text-[#C7C7CC]" />
              <p className="font-medium text-[#1D1D1F]">Your collection is empty</p>
              <p>Bookmark any residence in the catalog to curate your shortlist.</p>
            </div>
          ) : (
            savedList.map((p) => (
              <div
                key={p.id}
                className="p-4 rounded-2xl bg-[#F8F9FA] border border-black/5 space-y-3"
              >
                <div className="flex gap-3">
                  <div className="w-20 h-16 rounded-xl overflow-hidden bg-neutral-900 shrink-0">
                    <img src={p.mainImage} alt={p.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-[#1D1D1F] truncate">{p.title}</h4>
                    <p className="text-xs text-[#6E6E73]">{p.neighborhood}</p>
                    <p className="text-xs font-semibold text-[#1D1D1F] tabular-nums mt-0.5">
                      ${p.price.toLocaleString()}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      onRemove(p.id);
                    }}
                    className="apple-press p-1.5 text-[#86868B] hover:text-rose-500 self-start"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onSelectProperty(p);
                    }}
                    className="apple-press flex-1 py-1.5 rounded-lg text-xs font-medium text-[#1D1D1F] bg-white border border-[#E5E5E7] flex items-center justify-center gap-1"
                  >
                    <Eye className="w-3 h-3 text-[#0071E3]" />
                    <span>Inspect</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onScheduleShowing(p);
                    }}
                    className="apple-press flex-1 py-1.5 rounded-lg text-xs font-medium text-white bg-[#0071E3] flex items-center justify-center gap-1"
                  >
                    <Calendar className="w-3 h-3" />
                    <span>Book Tour</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
