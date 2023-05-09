<!-- eslint-disable vue/no-mutating-props -->
<template>
    <misa-dropdown title="Lọc danh hiệu" ref="misaDropdown">
        <template #click>
            <misa-button type="secondary">
                <div id="filter-icon" style="position: relative" class="icon-margin-right "
                    :class="filterChange ? 'icon__filter--status' : 'icon__filter'"></div>
                <span style="font-weight: 400;">Bộ lọc</span>
            </misa-button>
        </template>
        <template #content>
            <form class="form" style="padding: 0;">
                <div class="form-item"><label class="form-item__label">Đối tượng
                        khen thưởng</label>
                    <div class="form-item__content">
                        <misa-combobox v-model="ApplyObject" :options="object"></misa-combobox>
                    </div>
                </div>
                <div class="form-item"><label class="form-item__label">Cấp khen
                        thưởng</label>
                    <div class="form-item__content">
                        <misa-combobox v-model="CommendationLevel" :options="level"></misa-combobox>
                    </div>
                </div>
                <div class="form-item"><label class="form-item__label">Loại phong
                        trào</label>
                    <div class="form-item__content">
                        <misa-combobox v-model="MovementType" :options="type"></misa-combobox>
                    </div>
                </div>
                <div class="form-item"><label class="form-item__label">Trạng
                        thái</label>
                    <div class="form-item__content">
                        <misa-combobox v-model="Inactive" :options="status"></misa-combobox>
                    </div>
                </div>
            </form>

        </template>
        <template #footer>
            <button class="button button__secondary" type="button" @click="cancelFilter()">
                <span>Hủy</span>
            </button>
            <button class="button button__primary" type="button" @click="applyFilter()">
                <span>Áp dụng</span>
            </button>
        </template>
    </misa-dropdown>
    <misa-button type="link" v-if="filterChange" class="filter-button" @click="removeFilter">
        Bỏ lọc
    </misa-button>
</template>

<script>
//TODO: actual filter
export default {
    data() {
        return {
            ApplyObject: null,
            CommendationLevel: null,
            MovementType: null,
            Inactive: null,
            object: [
                {
                    label: 'Tất cả',
                    value: null
                }, {
                    label: 'Gia đình',
                    value: 1
                }, {
                    label: 'Tập thể',
                    value: this.$enum.EmulationTitle.ApplyObject.Organization
                }, {
                    label: 'Cá nhân',
                    value: this.$enum.EmulationTitle.ApplyObject.Person
                }, {
                    label: 'Cá nhân và tập thể',
                    value: 4
                },
            ],
            level: [
                {
                    label: 'Tất cả',
                    value: null
                }, {
                    label: 'Cấp nhà nước',
                    value: this.$enum.EmulationTitle.CommendationLevel.CapNhaNuoc
                }, {
                    label: 'Cấp Tỉnh/tương đương',
                    value: this.$enum.EmulationTitle.CommendationLevel.CapTinh
                }, {
                    label: 'Cấp Huyện/tương đương',
                    value: this.$enum.EmulationTitle.CommendationLevel.CapHuyen
                }, {
                    label: 'Cấp Xã/tương đương',
                    value: this.$enum.EmulationTitle.CommendationLevel.CapXa
                },
            ],
            type: [
                {
                    label: 'Tất cả',
                    value: null
                }, {
                    label: 'Thường xuyên',
                    value: this.$enum.EmulationTitle.MovementType.Sometimes
                }, {
                    label: 'Theo đợt',
                    value: this.$enum.EmulationTitle.MovementType.Period
                },
            ],
            status: [
                {
                    label: 'Tất cả',
                    value: null
                }, {
                    label: 'Sử dụng',
                    value: this.$enum.EmulationTitle.Active
                }, {
                    label: 'Ngưng sử dụng',
                    value: this.$enum.EmulationTitle.Inactive
                },
            ]
        }
    },
    props: {
        filterValue: {
            type: Object
        }
    },
    watch: {
        /**
         * Reassgin the value of the filter value
         */
        filterValue: {
            handler() {
                const { ApplyObject, CommendationLevel, MovementType, Inactive } = this.filterValue;
                this.ApplyObject = ApplyObject;
                this.CommendationLevel = CommendationLevel;
                this.MovementType = MovementType;
                this.Inactive = Inactive;
            },
            immediate: true,
            deep: true
        }
    },
    computed: {
        /**
         * Check if the filter is change or not
         * Default: null
         */
        filterChange() {
            const { ApplyObject, CommendationLevel, MovementType, Inactive } = this.filterValue;
            return (ApplyObject || CommendationLevel || MovementType || Inactive);
        }
    },
    emits: ['change-filter'],
    methods: {
        //Remove all filters (set to null)
        removeFilter() {
            this.$emit('change-filter', { ApplyObject: null, CommendationLevel: null, MovementType: null, Inactive: null })
        },
        /**
         * Cancel changes in the drop down options
         */
        cancelFilter() {
            // Assign filter values to variables
            const { ApplyObject, CommendationLevel, MovementType, Inactive } = this.filterValue;
            this.ApplyObject = ApplyObject;
            this.CommendationLevel = CommendationLevel;
            this.MovementType = MovementType;
            this.Inactive = Inactive;
            // Close dropdown
            this.closeDropdown();
        },
        /**
         * Save filter change and send it to the table
         */
        applyFilter() {
            this.$emit('change-filter', { ApplyObject: this.ApplyObject, CommendationLevel: this.CommendationLevel, MovementType: this.MovementType, Inactive: this.Inactive })
            this.closeDropdown()
        },
        /**
         * Close drop donwn
         */
        closeDropdown() {
            this.$refs.misaDropdown.toggleDropdown();
        }
    }
}
</script>