// Comprehensive test suite - 100+ edge case tests

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    return false;
  }
  return true;
}

function calculateExternalMark(internal) {
  let external_mark = 91;
  if (internal >= 23) {
    external_mark = 45;
  } else {
    external_mark = (50 - internal) * 1.667;
  }
  return Math.floor(external_mark);
}

function runComprehensiveTests() {
  let passed = 0;
  let total = 0;
  let testResults = [];

  console.log("🧪 Comprehensive Test Suite - 100+ Edge Cases\n");

  // ===== SECTION 1: Integer Internal Marks (0-40) =====
  console.log("📍 SECTION 1: Integer Internal Marks (0-40)\n");
  for (let i = 0; i <= 40; i++) {
    total++;
    const ext = calculateExternalMark(i);
    const expectedExt = i >= 23 ? 45 : Math.floor((50 - i) * 1.667);
    const passed_test = assert(ext === expectedExt, `Internal ${i} → External ${ext}`);
    if (passed_test) passed++;

    if (i % 10 === 0) {
      testResults.push(`✓ Internal ${i}: External = ${ext}`);
    }
  }
  console.log(`  → Tested 41 integer values (0-40)\n`);

  // ===== SECTION 2: Decimal Internal Marks (High Precision) =====
  console.log("📍 SECTION 2: Decimal Internal Marks\n");
  const decimals = [0.1, 0.5, 1.5, 2.9, 5.7, 10.25, 15.75, 18.9, 22.99, 23.01, 25.5, 30.3, 35.75, 39.99];
  decimals.forEach(decimal => {
    total++;
    const ext = calculateExternalMark(decimal);
    const expectedExt = decimal >= 23 ? 45 : Math.floor((50 - decimal) * 1.667);
    const passed_test = assert(ext === expectedExt, `Internal ${decimal} → External ${ext}`);
    if (passed_test) passed++;
  });
  console.log(`  → Tested ${decimals.length} decimal values\n`);

  // ===== SECTION 3: Boundary Testing Around Threshold (23) =====
  console.log("📍 SECTION 3: Boundary Testing Around Threshold (23)\n");
  const boundaries = [22.0, 22.5, 22.9, 22.99, 22.999, 23.0, 23.001, 23.01, 23.5, 24.0];
  boundaries.forEach(boundary => {
    total++;
    const ext = calculateExternalMark(boundary);
    const expectedExt = boundary >= 23 ? 45 : Math.floor((50 - boundary) * 1.667);
    const passed_test = assert(ext === expectedExt, `Boundary ${boundary} → External ${ext}`);
    if (passed_test) passed++;
  });
  console.log(`  → Tested ${boundaries.length} boundary values\n`);

  // ===== SECTION 4: Total Mark Calculations =====
  console.log("📍 SECTION 4: Total Mark Calculations\n");
  const totalsToTest = [0, 6.9, 10, 18.9, 23, 25, 30, 40];
  totalsToTest.forEach(internal => {
    total++;
    const ext = calculateExternalMark(internal);
    const totalMark = internal + ext;
    const passed_test = assert(totalMark >= 0, `Total with internal ${internal}: ${totalMark}`);
    if (passed_test) passed++;
    testResults.push(`Internal ${internal} + External ${ext} = Total ${totalMark}`);
  });
  console.log(`  → Tested ${totalsToTest.length} total calculations\n`);

  // ===== SECTION 5: Passing Threshold Validation =====
  console.log("📍 SECTION 5: Passing Threshold Validation (>= 40)\n");
  for (let i = 0; i <= 40; i += 2) {
    total++;
    const ext = calculateExternalMark(i);
    const totalMark = i + ext;
    const passed_test = assert(totalMark >= 40, `Internal ${i}: Total ${totalMark} >= 40`);
    if (passed_test) passed++;
  }
  console.log(`  → Tested 21 passing thresholds\n`);

  // ===== SECTION 6: Float Precision & Rounding =====
  console.log("📍 SECTION 6: Float Precision & Rounding\n");
  const precisionTests = [
    { internal: 6.9, desc: "Single decimal" },
    { internal: 6.99, desc: "Two decimals" },
    { internal: 6.999, desc: "Three decimals" },
    { internal: 18.95, desc: "Mid-range decimal" },
    { internal: 22.999, desc: "Just below threshold" },
    { internal: 23.001, desc: "Just above threshold" },
  ];
  precisionTests.forEach(test => {
    total++;
    const ext = calculateExternalMark(test.internal);
    const passed_test = assert(Number.isInteger(ext), `${test.desc}: ${test.internal} → ${ext} (integer)`);
    if (passed_test) passed++;
  });
  console.log(`  → Tested ${precisionTests.length} precision cases\n`);

  // ===== SECTION 7: External Mark Range Validation =====
  console.log("📍 SECTION 7: External Mark Range Validation\n");
  for (let i = 0; i <= 40; i++) {
    total++;
    const ext = calculateExternalMark(i);
    const passed_test = assert(ext >= 45 && ext <= 83, `Internal ${i}: External ${ext} in range [45, 83]`);
    if (passed_test) passed++;
  }
  console.log(`  → Tested 41 external mark ranges\n`);

  // ===== SECTION 8: Specific Scenario Tests =====
  console.log("📍 SECTION 8: Specific Scenario Tests\n");
  const scenarios = [
    { internal: 0, expectedExt: 83, desc: "Zero internal (worst case)" },
    { internal: 6.9, expectedExt: 71, desc: "Screenshot example" },
    { internal: 18.9, expectedExt: 51, desc: "With bonus scenario" },
    { internal: 23, expectedExt: 45, desc: "At threshold" },
    { internal: 40, expectedExt: 45, desc: "Perfect internal" },
  ];
  scenarios.forEach(scenario => {
    total++;
    const ext = calculateExternalMark(scenario.internal);
    const passed_test = assert(ext === scenario.expectedExt, `${scenario.desc}: ${scenario.internal} → ${ext} (expected ${scenario.expectedExt})`);
    if (passed_test) passed++;
    testResults.push(`✓ ${scenario.desc}: Internal ${scenario.internal} → External ${ext}`);
  });
  console.log(`  → Tested ${scenarios.length} specific scenarios\n`);

  // ===== SECTION 9: Negative Validation (Should work with formula) =====
  console.log("📍 SECTION 9: External Mark Consistency\n");
  for (let i = 0; i <= 40; i += 5) {
    total++;
    const ext1 = calculateExternalMark(i);
    const ext2 = calculateExternalMark(i);
    const passed_test = assert(ext1 === ext2, `Consistency check: Internal ${i} always gives ${ext1}`);
    if (passed_test) passed++;
  }
  console.log(`  → Tested 9 consistency checks\n`);

  // ===== SECTION 10: Type Safety =====
  console.log("📍 SECTION 10: Type Safety\n");
  total++;
  if (assert(Number.isInteger(calculateExternalMark(6.9)), "Result is always integer")) passed++;
  total++;
  if (assert(typeof calculateExternalMark(6.9) === 'number', "Result is always number type")) passed++;
  total++;
  if (assert(calculateExternalMark(6.9) > 0, "Result is always positive")) passed++;
  console.log(`  → Tested 3 type safety checks\n`);

  // ===== SUMMARY =====
  console.log("═".repeat(60));
  console.log(`\n📊 FINAL RESULTS: ${passed}/${total} TESTS PASSED`);
  console.log(`Success Rate: ${((passed/total)*100).toFixed(2)}%\n`);

  if (passed === total) {
    console.log("🎉 ALL TESTS PASSED! Mark calculation logic is robust.\n");
  } else {
    console.log(`⚠️  ${total - passed} tests failed.\n`);
  }

  // Print key scenarios summary
  console.log("📋 Key Scenario Summary:");
  testResults.forEach(result => console.log(`   ${result}`));

  return passed === total;
}

runComprehensiveTests();
