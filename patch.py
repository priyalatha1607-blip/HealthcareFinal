with open(r'c:\Users\Priya\Desktop\New folder\Healthcare\src\screens\BookAppointmentScreen.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Replace input Container with time slots
replacement_slots = '''          {form.date ? (
            <View style={styles.timeSlotsContainer}>
              {['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM'].map((slot) => (
                <TouchableOpacity
                  key={slot}
                  style={[
                    styles.timeSlot,
                    form.time === slot && styles.timeSlotSelected,
                    errors.time && !form.time && styles.inputError
                  ]}
                  onPress={() => setForm({ ...form, time: slot })}
                >
                  <Text style={[
                    styles.timeSlotText,
                    form.time === slot && styles.timeSlotTextSelected
                  ]}>
                    {slot}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <Text style={styles.infoText}>Please select a date first to view available times.</Text>
          )}\n'''

# Replace styles at the end
replacement_styles = '''  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  timeSlot: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.borderMedium,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: COLORS.white,
  },
  timeSlotSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  timeSlotText: {
    fontSize: 14,
    color: COLORS.text,
  },
  timeSlotTextSelected: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  infoText: {
    color: '#888',
    fontSize: 14,
    marginBottom: 12,
    fontStyle: 'italic',
  },
});
'''

# New lines construction
new_lines = lines[:186]
new_lines.append(replacement_slots)
new_lines.extend(lines[194:-2])
new_lines.append(replacement_styles)

with open(r'c:\Users\Priya\Desktop\New folder\Healthcare\src\screens\BookAppointmentScreen.tsx', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)
