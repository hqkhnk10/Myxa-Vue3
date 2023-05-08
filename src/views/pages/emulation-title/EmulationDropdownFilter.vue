<!-- eslint-disable vue/no-mutating-props -->
<template>
    <misa-dropdown title="Lọc danh hiệu" ref="misaDropdown">
        <template #click>
            <misa-button type="secondary">
                <div id="filter-icon" style="position: relative" class="icon-margin-right " :class="filterChange ? 'icon__filter--status' : 'icon__filter'"></div>
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
            ApplyObject: -1,
            CommendationLevel: -1,
            MovementType: -1,
            Inactive: -1,
            object: [
                {
                    label: 'Tất cả',
                    value: -1
                }, {
                    label: 'Gia đình',
                    value: 1
                }, {
                    label: 'Tập thể',
                    value: 2
                }, {
                    label: 'Cá nhân',
                    value: 3
                }, {
                    label: 'Cá nhân và tập thể',
                    value: 4
                },
            ],
            level: [
                {
                    label: 'Tất cả',
                    value: -1
                }, {
                    label: 'Cấp nhà nước',
                    value: 1
                }, {
                    label: 'Cấp Tỉnh/tương đương',
                    value: 2
                }, {
                    label: 'Cấp Huyện/tương đương',
                    value: 3
                }, {
                    label: 'Cấp Xã/tương đương',
                    value: 4
                },
            ],
            type: [
                {
                    label: 'Tất cả',
                    value: -1
                }, {
                    label: 'Thường xuyên',
                    value: 1
                }, {
                    label: 'Theo đợt',
                    value: 2
                },
            ],
            status: [
                {
                    label: 'Tất cả',
                    value: -1
                }, {
                    label: 'Sử dụng',
                    value: 1
                }, {
                    label: 'Ngưng sử dụng',
                    value: 2
                },
            ]
        }
    },
    watch: {
        filterValue() {
            this.ApplyObject = this.filterValue.object,
            this.CommendationLevel = this.filterValue.level,
            this.MovementType = this.filterValue.type,
            this.Inactive = this.filterValue.status
        }
    },
    computed: {
        filterChange() {
            return (this.filterValue.object != -1
                || this.filterValue.type != -1
                || this.filterValue.level != -1
                || this.filterValue.status != -1);
        }
    },
    props:{
        filterValue:{
            type: Object
        }
    },
    emits: ['update:filterValue', 'change-filter'],
    methods:{
        removeFilter(){
            this.$emit('update:filterValue',{object:-1,level:-1,type:-1,status:-1} )

        },
        cancelFilter(){
            this.ApplyObject = this.filterValue.object,
            this.CommendationLevel = this.filterValue.level,
            this.MovementType = this.filterValue.type,
            this.Inactive = this.filterValue.status
            this.closeDropdown()
        },
        applyFilter(){
            this.closeDropdown()
            this.$emit('update:filterValue',{object:this.ApplyObject,level:this.CommendationLevel,type:this.MovementType,status:this.Inactive} )
            this.$emit('change-filter')
        },
        closeDropdown(){
            this.$refs.misaDropdown.toggleDropdown();
        }
    }
}
</script>