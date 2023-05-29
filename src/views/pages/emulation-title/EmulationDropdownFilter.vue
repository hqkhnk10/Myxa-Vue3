<!-- eslint-disable vue/no-mutating-props -->
<template>
  <misa-dropdown
    :title="t('emulationTitle.filterTitle')"
    ref="misaDropdown"
    v-model="dropDownFilter"
  >
    <template #click>
      <misa-button type="secondary" @click="toogleDropDownFilter">
        <div
          class="icon-margin-right"
          :class="filterChange ? 'icon__filter--status' : 'icon__filter'"
        ></div>
        <span>{{ t("reuse.filter") }}</span>
      </misa-button>
    </template>
    <template #content>
      <form class="form">
        <div class="form-item">
          <div class="form-item__label">
            {{ t("emulationTitle.applyObject") }}
          </div>
          <div class="form-item__content">
            <misa-combobox
              v-model="ApplyObject"
              :options="object"
              v-model:valid="validate.ApplyObject"
              :message="t('emulationTitle.applyObject')"
            ></misa-combobox>
          </div>
        </div>
        <div class="form-item">
          <div class="form-item__label">
            {{ t("emulationTitle.commendationLevel") }}
          </div>
          <div class="form-item__content">
            <misa-combobox
              v-model="CommendationLevel"
              :options="level"
              v-model:valid="validate.CommendationLevel"
              :message="t('emulationTitle.commendationLevel')"
            ></misa-combobox>
          </div>
        </div>
        <div class="form-item">
          <div class="form-item__label">
            {{ t("emulationTitle.movementType") }}
          </div>
          <div class="form-item__content">
            <misa-combobox
              v-model="MovementType"
              :options="type"
              v-model:valid="validate.MovementType"
              :message="t('emulationTitle.movementType')"
            ></misa-combobox>
          </div>
        </div>
        <div class="form-item">
          <div class="form-item__label">{{ t("emulationTitle.status") }}</div>
          <div class="form-item__content">
            <misa-combobox
              v-model="Inactive"
              :options="status"
              v-model:valid="validate.Inactive"
              :message="t('emulationTitle.status')"
            ></misa-combobox>
          </div>
        </div>
      </form>
    </template>
    <template #footer>
      <button
        class="button button__secondary"
        type="button"
        @click="cancelFilter()"
      >
        <span>{{ t("reuse.cancel") }}</span>
      </button>
      <button
        class="button button__primary"
        type="button"
        @click="applyFilter()"
      >
        <span>{{ t("reuse.apply") }}</span>
      </button>
    </template>
  </misa-dropdown>
  <misa-button
    type="link"
    v-if="filterChange"
    class="filter-button"
    @click="removeFilter"
  >
    {{ t("reuse.removeFilter") }}
  </misa-button>
</template>

<script>
//TODO: actual filter
export default {
  data() {
    return {
      validate: {
        ApplyObject: true,
        CommendationLevel: true,
        MovementType: true,
        Inactive: true,
      },
      dropDownFilter: false,
      ApplyObject: null,
      CommendationLevel: null,
      MovementType: null,
      Inactive: null,
      object: [
        {
          label: this.t("reuse.all"),
          value: null,
        },
        {
          label: this.t("emulationTitle.family"),
          value: this.$enum.EmulationTitle.ApplyObject.Family,
        },
        {
          label: this.t("emulationTitle.group"),
          value: this.$enum.EmulationTitle.ApplyObject.Organization,
        },
        {
          label: this.t("emulationTitle.personal"),
          value: this.$enum.EmulationTitle.ApplyObject.Person,
        },
        {
          label: this.t("emulationTitle.personalAndFamily"),
          value: this.$enum.EmulationTitle.ApplyObject.PersonAndOrg,
        },
      ],
      level: [
        {
          label: this.t("reuse.all"),
          value: null,
        },
        {
          label: this.t("emulationTitle.countryLevel"),
          value: this.$enum.EmulationTitle.CommendationLevel.CapNhaNuoc,
        },
        {
          label: this.t("emulationTitle.provinceLevel"),
          value: this.$enum.EmulationTitle.CommendationLevel.CapTinh,
        },
        {
          label: this.t("emulationTitle.districtLevel"),
          value: this.$enum.EmulationTitle.CommendationLevel.CapHuyen,
        },
        {
          label: this.t("emulationTitle.communeLevel"),
          value: this.$enum.EmulationTitle.CommendationLevel.CapXa,
        },
      ],
      type: [
        {
          label: this.t("reuse.all"),
          value: null,
        },
        {
          label: this.t("emulationTitle.regular"),
          value: this.$enum.EmulationTitle.MovementType.Sometimes,
        },
        {
          label: this.t("emulationTitle.period"),
          value: this.$enum.EmulationTitle.MovementType.Period,
        },
      ],
      status: [
        {
          label: this.t("reuse.all"),
          value: null,
        },
        {
          label: this.t("reuse.using"),
          value: this.$enum.EmulationTitle.Active,
        },
        {
          label: this.t("reuse.shutdown"),
          value: this.$enum.EmulationTitle.Inactive,
        },
      ],
    };
  },
  props: {
    filterValue: {
      type: Object,
      description:
        "Dữ liệu filter, { ApplyObject : 1/2/3, CommendationLevel:0/1/2/3, MovementType:0/1/2, Inactive:0/1 }",
    },
  },
  watch: {
    /**
     * Reassgin the value of the filter value
     * Created At: 10/05/2023
     * @author QTNgo
     */
    filterValue: {
      handler() {
        const { ApplyObject, CommendationLevel, MovementType, Inactive } =
          this.filterValue;
        this.ApplyObject = ApplyObject;
        this.CommendationLevel = CommendationLevel;
        this.MovementType = MovementType;
        this.Inactive = Inactive;
      },
      immediate: true,
      deep: true,
    },
  },
  computed: {
    /**
     * Check if the filter is change or not
     * Default: null
     * Created At: 10/05/2023
     * @author QTNgo
     */
    filterChange() {
      const { ApplyObject, CommendationLevel, MovementType, Inactive } =
        this.filterValue;
      return ApplyObject || CommendationLevel || MovementType || Inactive;
    },
  },
  emits: ["change-filter"],
  methods: {
    /**
     * Toggle visibility of drop down filter
     * Created At: 10/05/2023
     * @author QTNgo
     */
    toogleDropDownFilter() {
      this.dropDownFilter = !this.dropDownFilter;
    },
    /**
     * Remove all filter, remove params in getAPI func
     * Created At: 10/05/2023
     * @author QTNgo
     */
    //Remove reuse.all filters (set to null)
    removeFilter() {
      this.$emit("change-filter", {
        ApplyObject: null,
        CommendationLevel: null,
        MovementType: null,
        Inactive: null,
      });
    },
    /**
     * Cancel changes in the drop down options
     * Created At: 10/05/2023
     * @author QTNgo
     */
    cancelFilter() {
      // Assign filter values to variables
      const { ApplyObject, CommendationLevel, MovementType, Inactive } =
        this.filterValue;
      this.ApplyObject = ApplyObject;
      this.CommendationLevel = CommendationLevel;
      this.MovementType = MovementType;
      this.Inactive = Inactive;
      // Close dropdown
      this.closeDropdown();
    },
    /**
     * Save filter change and send it to the table
     * Created At: 10/05/2023
     * @author QTNgo
     * @author
     */
    applyFilter() {
      if(!Object.keys(this.validate).every(keys => this.validate[keys])){
        return
      }
      this.$emit("change-filter", {
        ApplyObject: this.ApplyObject,
        CommendationLevel: this.CommendationLevel,
        MovementType: this.MovementType,
        Inactive: this.Inactive,
      });
      this.closeDropdown();
    },
    /**
     * Close drop donwn
     * Created At: 10/05/2023
     * @author QTNgo
     * @author
     */
    closeDropdown() {
      this.$refs.misaDropdown.closeDropDown();
    },
  },
};
</script>
